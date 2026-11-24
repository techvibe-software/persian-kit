const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Converts Persian and Arabic digits to ASCII English digits.
 */
export function toEnglishDigits(input: string | number): string {
  if (input === null || input === undefined) return "";
  let str = String(input);
  for (let i = 0; i < 10; i++) {
    str = str.replace(new RegExp(PERSIAN_DIGITS[i], "g"), String(i));
    str = str.replace(new RegExp(ARABIC_DIGITS[i], "g"), String(i));
  }
  return str;
}

/**
 * Converts ASCII English digits to Persian digits.
 */
export function toPersianDigits(input: string | number): string {
  if (input === null || input === undefined) return "";
  let str = String(input);
  for (let i = 0; i < 10; i++) {
    str = str.replace(new RegExp(String(i), "g"), PERSIAN_DIGITS[i]);
  }
  return str;
}

/**
 * Normalizes common Arabic characters to Persian (ك -> ک, ي -> ی, etc.)
 * and strips decorative tatweel/kashida.
 */
export function cleanPersianText(input: string): string {
  if (!input) return "";
  return input
    .replace(/ك/g, "ک")
    .replace(/[يى]/g, "ی")
    .replace(/ة/g, "ه")
    .replace(/ـ+/g, "") // remove tatweel
    .replace(/[\u064B-\u065F]/g, "") // remove diacritics / harakat
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generates an SEO-friendly slug supporting Persian and English text.
 */
export function toPersianSlug(input: string, separator: string = "-"): string {
  if (!input) return "";
  const cleaned = cleanPersianText(toEnglishDigits(input).toLowerCase());
  return cleaned
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, separator)
    .replace(new RegExp(`${separator}+`, "g"), separator);
}
