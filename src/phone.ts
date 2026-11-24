import { toEnglishDigits } from "./text";

export type MobileOperator = "MCI" | "MTN" | "RighTel" | "Shatel" | "Taliya" | "Unknown";

export interface MobileOperatorInfo {
  operator: MobileOperator;
  nameFa: string;
  nameEn: string;
}

const OPERATOR_PREFIXES: Record<string, { operator: MobileOperator; nameFa: string; nameEn: string }> = {
  // Hamrah-e Aval (MCI)
  "0910": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0911": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0912": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0913": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0914": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0915": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0916": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0917": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0918": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0919": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0990": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0991": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0992": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0993": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0994": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },
  "0996": { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" },

  // Irancell (MTN)
  "0930": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0933": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0935": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0936": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0937": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0938": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0939": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0901": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0902": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0903": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0904": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0905": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },
  "0941": { operator: "MTN", nameFa: "ایرانسل", nameEn: "Irancell (MTN)" },

  // RighTel
  "0920": { operator: "RighTel", nameFa: "رایتل", nameEn: "RighTel" },
  "0921": { operator: "RighTel", nameFa: "رایتل", nameEn: "RighTel" },
  "0922": { operator: "RighTel", nameFa: "رایتل", nameEn: "RighTel" },
  "0923": { operator: "RighTel", nameFa: "رایتل", nameEn: "RighTel" },

  // Shatel
  "0998": { operator: "Shatel", nameFa: "شاتل موبایل", nameEn: "Shatel Mobile" },

  // Taliya
  "0932": { operator: "Taliya", nameFa: "تالیا", nameEn: "Taliya" },
};

/**
 * Normalizes an Iranian phone number into standard 11-digit local format: 09xxxxxxxxx.
 */
function normalizeToLocal(phone: string): string | null {
  if (!phone) return null;
  let digits = toEnglishDigits(phone).replace(/[^\d+]/g, "");

  if (digits.startsWith("+98")) {
    digits = "0" + digits.slice(3);
  } else if (digits.startsWith("0098")) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("98") && digits.length === 12) {
    digits = "0" + digits.slice(2);
  } else if (digits.length === 10 && digits.startsWith("9")) {
    digits = "0" + digits;
  }

  if (/^09\d{9}$/.test(digits)) {
    return digits;
  }
  return null;
}

/**
 * Validates whether the given string is a valid Iranian mobile number.
 */
export function isValidIranianMobile(phone: string): boolean {
  return normalizeToLocal(phone) !== null;
}

/**
 * Returns the telecom operator of an Iranian mobile phone number.
 */
export function getMobileOperator(phone: string): MobileOperatorInfo | null {
  const normalized = normalizeToLocal(phone);
  if (!normalized) return null;

  const prefix = normalized.slice(0, 4);
  const found = OPERATOR_PREFIXES[prefix];
  if (!found) {
    return {
      operator: "Unknown",
      nameFa: "ناشناخته",
      nameEn: "Unknown",
    };
  }

  return found;
}

/**
 * Formats an Iranian mobile number into standard representation.
 */
export function formatIranianMobile(
  phone: string,
  format: "local" | "international" | "spaced" = "spaced"
): string {
  const normalized = normalizeToLocal(phone);
  if (!normalized) return phone;

  if (format === "local") {
    return normalized;
  }
  if (format === "international") {
    return `+98${normalized.slice(1)}`;
  }
  // spaced format: 0912 345 6789
  return `${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`;
}
