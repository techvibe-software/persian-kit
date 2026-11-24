import { toEnglishDigits } from "./text";

export interface BankInfo {
  name: string;
  nameEn: string;
  code: string;
  logo?: string;
  color?: string;
}

const BANK_CARD_PREFIXES: Record<string, { name: string; nameEn: string; code: string }> = {
  "603799": { name: "بانک ملی ایران", nameEn: "Bank Melli Iran", code: "017" },
  "589210": { name: "بانک سپه", nameEn: "Bank Sepah", code: "015" },
  "627648": { name: "بانک توسعه صادرات", nameEn: "Export Development Bank", code: "020" },
  "627961": { name: "بانک صنعت و معدن", nameEn: "Sanat va Madan Bank", code: "011" },
  "603770": { name: "بانک کشاورزی", nameEn: "Keshavarzi Bank", code: "016" },
  "628023": { name: "بانک مسکن", nameEn: "Bank Maskan", code: "014" },
  "627760": { name: "پست بانک ایران", nameEn: "Post Bank Iran", code: "021" },
  "502908": { name: "بانک توسعه تعاون", nameEn: "Tose'e Ta'avon Bank", code: "022" },
  "627412": { name: "بانک اقتصاد نوین", nameEn: "Eghtesad Novin Bank", code: "055" },
  "622106": { name: "بانک پارسیان", nameEn: "Parsian Bank", code: "054" },
  "502229": { name: "بانک پاسارگاد", nameEn: "Pasargad Bank", code: "057" },
  "627488": { name: "بانک کارآفرین", nameEn: "Karafarin Bank", code: "053" },
  "621986": { name: "بانک سامان", nameEn: "Saman Bank", code: "056" },
  "639346": { name: "بانک سینا", nameEn: "Sina Bank", code: "059" },
  "639607": { name: "بانک سرمایه", nameEn: "Sarmayeh Bank", code: "058" },
  "636214": { name: "بانک آینده", nameEn: "Ayandeh Bank", code: "062" },
  "505785": { name: "بانک ایران زمین", nameEn: "Iran Zamin Bank", code: "069" },
  "505416": { name: "بانک گردشگری", nameEn: "Gardeshgari Bank", code: "064" },
  "603769": { name: "بانک صادرات ایران", nameEn: "Bank Saderat Iran", code: "019" },
  "610433": { name: "بانک ملت", nameEn: "Bank Mellat", code: "012" },
  "627353": { name: "بانک تجارت", nameEn: "Tejarat Bank", code: "018" },
  "589463": { name: "بانک رفاه کارگران", nameEn: "Refah Kargaran Bank", code: "013" },
  "627381": { name: "بانک انصار (سپه)", nameEn: "Ansar Bank", code: "063" },
  "505801": { name: "موسسه اعتباری کوثر (سپه)", nameEn: "Kowsar Credit Institute", code: "073" },
  "606373": { name: "بانک قرض‌الحسنه مهر ایران", nameEn: "Qarz Al-Hasaneh Mehr Iran", code: "060" },
  "504172": { name: "بانک قرض‌الحسنه رسالت", nameEn: "Resalat Bank", code: "070" },
  "639599": { name: "بانک قوامین (سپه)", nameEn: "Ghavamin Bank", code: "052" },
  "636949": { name: "بانک حکمت ایرانیان (سپه)", nameEn: "Hekmat Bank", code: "065" },
  "505809": { name: "بانک خاورمیانه", nameEn: "Middle East Bank", code: "078" },
  "639370": { name: "بانک مهر اقتصاد (سپه)", nameEn: "Mehr Eghtesad Bank", code: "079" },
};

const SHEBA_BANK_CODES: Record<string, { name: string; nameEn: string; code: string }> = {
  "010": { name: "بانک مرکزی", nameEn: "Central Bank of Iran", code: "010" },
  "011": { name: "بانک صنعت و معدن", nameEn: "Sanat va Madan Bank", code: "011" },
  "012": { name: "بانک ملت", nameEn: "Bank Mellat", code: "012" },
  "013": { name: "بانک رفاه کارگران", nameEn: "Refah Kargaran Bank", code: "013" },
  "014": { name: "بانک مسکن", nameEn: "Bank Maskan", code: "014" },
  "015": { name: "بانک سپه", nameEn: "Bank Sepah", code: "015" },
  "016": { name: "بانک کشاورزی", nameEn: "Keshavarzi Bank", code: "016" },
  "017": { name: "بانک ملی ایران", nameEn: "Bank Melli Iran", code: "017" },
  "018": { name: "بانک تجارت", nameEn: "Tejarat Bank", code: "018" },
  "019": { name: "بانک صادرات ایران", nameEn: "Bank Saderat Iran", code: "019" },
  "020": { name: "بانک توسعه صادرات", nameEn: "Export Development Bank", code: "020" },
  "021": { name: "پست بانک ایران", nameEn: "Post Bank Iran", code: "021" },
  "022": { name: "بانک توسعه تعاون", nameEn: "Tose'e Ta'avon Bank", code: "022" },
  "053": { name: "بانک کارآفرین", nameEn: "Karafarin Bank", code: "053" },
  "054": { name: "بانک پارسیان", nameEn: "Parsian Bank", code: "054" },
  "055": { name: "بانک اقتصاد نوین", nameEn: "Eghtesad Novin Bank", code: "055" },
  "056": { name: "بانک سامان", nameEn: "Saman Bank", code: "056" },
  "057": { name: "بانک پاسارگاد", nameEn: "Pasargad Bank", code: "057" },
  "058": { name: "بانک سرمایه", nameEn: "Sarmayeh Bank", code: "058" },
  "059": { name: "بانک سینا", nameEn: "Sina Bank", code: "059" },
  "060": { name: "بانک قرض‌الحسنه مهر ایران", nameEn: "Qarz Al-Hasaneh Mehr Iran", code: "060" },
  "062": { name: "بانک آینده", nameEn: "Ayandeh Bank", code: "062" },
  "064": { name: "بانک گردشگری", nameEn: "Gardeshgari Bank", code: "064" },
  "069": { name: "بانک ایران زمین", nameEn: "Iran Zamin Bank", code: "069" },
  "070": { name: "بانک قرض‌الحسنه رسالت", nameEn: "Resalat Bank", code: "070" },
  "078": { name: "بانک خاورمیانه", nameEn: "Middle East Bank", code: "078" },
};

/**
 * Validates a 16-digit Iranian bank card using the Luhn checksum algorithm.
 */
export function isValidCardNumber(cardNumber: string | number): boolean {
  if (cardNumber === null || cardNumber === undefined) return false;
  const digits = toEnglishDigits(String(cardNumber)).replace(/\D/g, "");

  if (digits.length !== 16) return false;

  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let digit = parseInt(digits[i], 10);
    // Double every second digit from right (or even indexed positions 0, 2, 4...)
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

/**
 * Identifies the Iranian bank issuing the given 16-digit debit/credit card.
 */
export function getBankByCardNumber(cardNumber: string | number): BankInfo | null {
  if (!cardNumber) return null;
  const digits = toEnglishDigits(String(cardNumber)).replace(/\D/g, "");
  if (digits.length < 6) return null;

  const bin = digits.slice(0, 6);
  const found = BANK_CARD_PREFIXES[bin];
  if (!found) return null;

  return {
    name: found.name,
    nameEn: found.nameEn,
    code: found.code,
  };
}

/**
 * Formats a 16-digit card number with custom separator (default: 6037-9918-xxxx-xxxx).
 */
export function formatCardNumber(cardNumber: string | number, separator: string = "-"): string {
  if (!cardNumber) return "";
  const digits = toEnglishDigits(String(cardNumber)).replace(/\D/g, "");
  if (digits.length !== 16) return String(cardNumber);
  return `${digits.slice(0, 4)}${separator}${digits.slice(4, 8)}${separator}${digits.slice(8, 12)}${separator}${digits.slice(12, 16)}`;
}

/**
 * Validates an Iranian IBAN (Sheba / شماره شبا) using ISO 7064 Mod-97 checksum.
 * Format: IR + 24 digits (total 26 chars).
 */
export function isValidSheba(sheba: string): boolean {
  if (!sheba) return false;
  const cleaned = toEnglishDigits(sheba).toUpperCase().replace(/[\s-]/g, "");

  // Must be IR + 24 digits
  if (!/^IR\d{24}$/.test(cleaned)) {
    return false;
  }

  // ISO 7064 algorithm:
  // Move "IR" to end -> I = 18, R = 27 -> "1827"
  // Rearrange: digits 2..25 + "182700" (or 1827 + check digits)
  // Cleaned is: IR [cc] [22 digits] -> rearrange to [22 digits] + 1827 + [cc]
  // Standard method: move first 4 chars to end:
  const rearranged = cleaned.slice(4) + "1827" + cleaned.slice(2, 4);

  // Compute mod 97 on large numeric string chunk-by-chunk
  let remainder = 0;
  for (let i = 0; i < rearranged.length; i += 7) {
    const chunk = String(remainder) + rearranged.slice(i, i + 7);
    remainder = parseInt(chunk, 10) % 97;
  }

  return remainder === 1;
}

/**
 * Extracts issuing bank information from an Iranian Sheba (IBAN).
 */
export function getBankBySheba(sheba: string): BankInfo | null {
  if (!sheba) return null;
  const cleaned = toEnglishDigits(sheba).toUpperCase().replace(/[\s-]/g, "");
  if (!/^IR\d{24}$/.test(cleaned)) return null;

  // The 3-digit bank code is at index 4..7 (after IR and 2 check digits)
  const bankCode = cleaned.slice(4, 7);
  const found = SHEBA_BANK_CODES[bankCode];
  if (!found) return null;

  return {
    name: found.name,
    nameEn: found.nameEn,
    code: found.code,
  };
}

/**
 * Formats a Sheba string into standard grouped format (e.g. IR12 0120 0000 ...).
 */
export function formatSheba(sheba: string): string {
  if (!sheba) return "";
  const cleaned = toEnglishDigits(sheba).toUpperCase().replace(/[\s-]/g, "");
  if (!/^IR\d{24}$/.test(cleaned)) return sheba;
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
}
