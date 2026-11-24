import { describe, it, expect } from "vitest";
import { numberToPersianWords } from "../numberToWords";

describe("Number to Words (تبدیل عدد به حروف)", () => {
  it("converts single digits", () => {
    expect(numberToPersianWords(0)).toBe("صفر");
    expect(numberToPersianWords(5)).toBe("پنج");
    expect(numberToPersianWords("9")).toBe("نه");
  });

  it("converts teens and tens", () => {
    expect(numberToPersianWords(11)).toBe("یازده");
    expect(numberToPersianWords(17)).toBe("هفده");
    expect(numberToPersianWords(20)).toBe("بیست");
    expect(numberToPersianWords(85)).toBe("هشتاد و پنج");
  });

  it("converts hundreds and thousands", () => {
    expect(numberToPersianWords(100)).toBe("صد");
    expect(numberToPersianWords(345)).toBe("سیصد و چهل و پنج");
    expect(numberToPersianWords(1000)).toBe("یک هزار");
    expect(numberToPersianWords(12500)).toBe("دوازده هزار و پانصد");
  });

  it("converts millions and billions", () => {
    expect(numberToPersianWords(1000000)).toBe("یک میلیون");
    expect(numberToPersianWords(2500000)).toBe("دو میلیون و پانصد هزار");
    expect(numberToPersianWords(1000000000)).toBe("یک میلیارد");
    expect(numberToPersianWords(1250000000)).toBe("یک میلیارد و دویست و پنجاه میلیون");
  });

  it("handles Persian digits as input", () => {
    expect(numberToPersianWords("۱۲۵۰۰")).toBe("دوازده هزار و پانصد");
  });

  it("handles negative numbers", () => {
    expect(numberToPersianWords(-50)).toBe("منفی پنجاه");
    expect(numberToPersianWords("-1200")).toBe("منفی یک هزار و دویست");
  });
});
