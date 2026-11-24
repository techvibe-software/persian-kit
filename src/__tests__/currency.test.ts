import { describe, it, expect } from "vitest";
import {
  rialToToman,
  tomanToRial,
  addCommas,
  removeCommas,
  formatCurrency,
} from "../currency";

describe("Currency (تومان و ریال)", () => {
  it("converts Rial to Toman", () => {
    expect(rialToToman(100000)).toBe(10000);
    expect(rialToToman("50000")).toBe(5000);
    expect(rialToToman("۵۰۰۰۰")).toBe(5000);
  });

  it("converts Toman to Rial", () => {
    expect(tomanToRial(10000)).toBe(100000);
    expect(tomanToRial("25000")).toBe(250000);
  });

  it("adds commas as thousands separators", () => {
    expect(addCommas(1000)).toBe("1,000");
    expect(addCommas(12500000)).toBe("12,500,000");
    expect(addCommas("12500000")).toBe("12,500,000");
    expect(addCommas("12500.75")).toBe("12,500.75");
  });

  it("removes commas", () => {
    expect(removeCommas("12,500,000")).toBe("12500000");
    expect(removeCommas("۱۲,۵۰۰")).toBe("12500");
  });

  it("formats currency with options", () => {
    expect(formatCurrency(150000)).toBe("150,000 تومان");
    expect(formatCurrency(150000, { unit: "rial" })).toBe("150,000 ریال");
    expect(formatCurrency(150000, { unit: "toman", persianDigits: true })).toBe("۱۵۰,۰۰۰ تومان");
    expect(formatCurrency(150000, { showUnit: false })).toBe("150,000");
  });
});
