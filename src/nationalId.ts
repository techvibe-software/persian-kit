import { toEnglishDigits } from "./text";

const FORBIDDEN_CODES = new Set([
  "0000000000",
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444",
  "5555555555",
  "6666666666",
  "7777777777",
  "8888888888",
  "9999999999",
]);

/**
 * Validates an Iranian National Code (کد ملی) using the official check-digit algorithm.
 * Accepts string or number, handles Persian/Arabic digits and automatically pads 8/9 digit codes.
 */
export function isValidNationalId(code: string | number): boolean {
  if (code === null || code === undefined) return false;
  const digits = toEnglishDigits(String(code)).replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 10) {
    return false;
  }

  const padded = digits.padStart(10, "0");

  if (FORBIDDEN_CODES.has(padded)) {
    return false;
  }

  const checkDigit = parseInt(padded[9], 10);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(padded[i], 10) * (10 - i);
  }

  const remainder = sum % 11;

  if (remainder < 2) {
    return checkDigit === remainder;
  } else {
    return checkDigit === 11 - remainder;
  }
}

/**
 * Formats a valid 10-digit national code with standard dashes (e.g., 001-234567-8).
 */
export function formatNationalId(code: string | number): string {
  if (code === null || code === undefined) return "";
  const digits = toEnglishDigits(String(code)).replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 10) return String(code);
  const padded = digits.padStart(10, "0");
  return `${padded.slice(0, 3)}-${padded.slice(3, 9)}-${padded.slice(9)}`;
}
