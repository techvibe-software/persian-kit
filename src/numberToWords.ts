import { toEnglishDigits } from "./text";

const ONES: Record<number, string> = {
  0: "صفر",
  1: "یک",
  2: "دو",
  3: "سه",
  4: "چهار",
  5: "پنج",
  6: "شش",
  7: "هفت",
  8: "هشت",
  9: "نه",
  10: "ده",
  11: "یازده",
  12: "دوازده",
  13: "سیزده",
  14: "چهارده",
  15: "پانزده",
  16: "شانزده",
  17: "هفده",
  18: "هجده",
  19: "نوزده",
};

const TENS: Record<number, string> = {
  2: "بیست",
  3: "سی",
  4: "چهل",
  5: "پنجاه",
  6: "شصت",
  7: "هفتاد",
  8: "هشتاد",
  9: "نود",
};

const HUNDREDS: Record<number, string> = {
  1: "صد",
  2: "دویست",
  3: "سیصد",
  4: "چهارصد",
  5: "پانصد",
  6: "ششصد",
  7: "هفتصد",
  8: "هشتصد",
  9: "نهصد",
};

const SCALE = [
  "",
  "هزار",
  "میلیون",
  "میلیارد",
  "تریلیون",
  "کوآدریلیون",
  "کوینتیلیون",
];

function threeDigitsToWords(num: number): string {
  if (num === 0) return "";
  const parts: string[] = [];

  const h = Math.floor(num / 100);
  const remainder = num % 100;

  if (h > 0 && HUNDREDS[h]) {
    parts.push(HUNDREDS[h]);
  }

  if (remainder > 0) {
    if (remainder < 20) {
      parts.push(ONES[remainder]);
    } else {
      const t = Math.floor(remainder / 10);
      const o = remainder % 10;
      if (t > 0 && TENS[t]) {
        parts.push(TENS[t]);
      }
      if (o > 0 && ONES[o]) {
        parts.push(ONES[o]);
      }
    }
  }

  return parts.join(" و ");
}

/**
 * Converts integers and numeric strings into spoken Persian words.
 * Example: 12500 -> "دوازده هزار و پانصد"
 */
export function numberToPersianWords(input: number | string): string {
  if (input === null || input === undefined) return "";
  const raw = toEnglishDigits(String(input)).trim();
  if (raw === "" || raw === "0") return ONES[0];

  let isNegative = false;
  let numStr = raw;
  if (numStr.startsWith("-")) {
    isNegative = true;
    numStr = numStr.substring(1);
  }

  // Handle decimals if any
  const [intPart, decPart] = numStr.split(".");
  const cleanInt = intPart.replace(/\D/g, "");
  if (!cleanInt || cleanInt === "0") {
    if (decPart) {
      const decWords = numberToPersianWords(decPart);
      return `${ONES[0]} ممیز ${decWords}`;
    }
    return ONES[0];
  }

  // Split into 3-digit chunks from right to left
  const chunks: number[] = [];
  let temp = cleanInt;
  while (temp.length > 0) {
    const chunkLength = temp.length % 3 === 0 ? 3 : temp.length % 3;
    chunks.unshift(parseInt(temp.slice(-3), 10));
    temp = temp.slice(0, -3);
  }

  const resultParts: string[] = [];
  const totalChunks = chunks.length;

  for (let i = 0; i < totalChunks; i++) {
    const chunkVal = chunks[i];
    const scaleIndex = totalChunks - 1 - i;

    if (chunkVal > 0) {
      const words = threeDigitsToWords(chunkVal);
      const scaleName = SCALE[scaleIndex];
      if (scaleName) {
        resultParts.push(`${words} ${scaleName}`);
      } else {
        resultParts.push(words);
      }
    }
  }

  let finalWords = resultParts.join(" و ");
  if (isNegative) {
    finalWords = `منفی ${finalWords}`;
  }

  if (decPart && decPart.length > 0) {
    const decWords = numberToPersianWords(decPart);
    finalWords = `${finalWords} ممیز ${decWords}`;
  }

  return finalWords;
}
