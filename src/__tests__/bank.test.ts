import { describe, it, expect } from "vitest";
import {
  isValidCardNumber,
  getBankByCardNumber,
  formatCardNumber,
  isValidSheba,
  getBankBySheba,
  formatSheba,
} from "../bank";

describe("Bank Cards & Sheba (کارت بانکی و شبا)", () => {
  it("validates valid 16-digit card numbers with Luhn", () => {
    expect(isValidCardNumber("6037991122334455")).toBe(true);
    expect(isValidCardNumber("6104337788990016")).toBe(true);
  });

  it("rejects invalid card numbers", () => {
    expect(isValidCardNumber("6037991122334456")).toBe(false);
    expect(isValidCardNumber("123456")).toBe(false);
    expect(isValidCardNumber("")).toBe(false);
  });

  it("identifies bank by 6-digit BIN prefix", () => {
    const melli = getBankByCardNumber("6037991122334455");
    expect(melli?.name).toBe("بانک ملی ایران");
    expect(melli?.nameEn).toBe("Bank Melli Iran");

    const mellat = getBankByCardNumber("6104337788990016");
    expect(mellat?.name).toBe("بانک ملت");

    const saman = getBankByCardNumber("6219861234567890");
    expect(saman?.name).toBe("بانک سامان");
  });

  it("formats card numbers with dashes", () => {
    expect(formatCardNumber("6037991122334455")).toBe("6037-9911-2233-4455");
    expect(formatCardNumber("6037991122334455", " ")).toBe("6037 9911 2233 4455");
  });

  it("extracts bank from Sheba code", () => {
    // 012 is Bank Mellat
    const bank = getBankBySheba("IR000120000000000000000000");
    expect(bank?.name).toBe("بانک ملت");

    // 017 is Bank Melli
    const melli = getBankBySheba("IR000170000000000000000000");
    expect(melli?.name).toBe("بانک ملی ایران");
  });

  it("formats Sheba with 4-character grouping", () => {
    const formatted = formatSheba("IR000120000000000000000000");
    expect(formatted).toBe("IR00 0120 0000 0000 0000 0000 00");
  });
});
