import { toEnglishDigits, toPersianDigits } from "./text";

export interface FormatCurrencyOptions {
  unit?: "toman" | "rial" | "none";
  persianDigits?: boolean;
  showUnit?: boolean;
}

/**
 * Converts Iranian Rial to Toman (divides by 10).
 */
export function rialToToman(rial: number | string): number {
  const clean = Number(toEnglishDigits(rial).replace(/[^\d.-]/g, ""));
  if (isNaN(clean)) return 0;
  return Math.floor(clean / 10);
}

/**
 * Converts Iranian Toman to Rial (multiplies by 10).
 */
export function tomanToRial(toman: number | string): number {
  const clean = Number(toEnglishDigits(toman).replace(/[^\d.-]/g, ""));
  if (isNaN(clean)) return 0;
  return clean * 10;
}

/**
 * Formats a number with comma thousands separators (e.g., 1000000 -> "1,000,000").
 */
export function addCommas(amount: number | string): string {
  if (amount === null || amount === undefined) return "";
  const str = toEnglishDigits(String(amount)).replace(/[^\d.-]/g, "");
  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/**
 * Removes commas and formatting from a currency string.
 */
export function removeCommas(formatted: string): string {
  if (!formatted) return "";
  return toEnglishDigits(formatted).replace(/,/g, "").trim();
}

/**
 * Formats monetary amounts with commas, optional unit, and Persian digits.
 */
export function formatCurrency(
  amount: number | string,
  options: FormatCurrencyOptions = {}
): string {
  const { unit = "toman", persianDigits = false, showUnit = true } = options;
  const commaSeparated = addCommas(amount);

  let result = persianDigits ? toPersianDigits(commaSeparated) : commaSeparated;

  if (showUnit && unit !== "none") {
    const unitLabel = unit === "toman" ? "تومان" : "ریال";
    result = `${result} ${unitLabel}`;
  }

  return result;
}
