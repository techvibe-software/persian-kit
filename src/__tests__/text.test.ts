import { describe, it, expect } from "vitest";
import {
  toEnglishDigits,
  toPersianDigits,
  cleanPersianText,
  toPersianSlug,
} from "../text";

describe("Text & Digits (حروف و ارقام)", () => {
  it("converts Persian and Arabic digits to English", () => {
    expect(toEnglishDigits("۰۱۲۳۴۵۶۷۸۹")).toBe("0123456789");
    expect(toEnglishDigits("٠١٢٣٤٥٦٧٨٩")).toBe("0123456789");
    expect(toEnglishDigits("سال ۱۴۰۳ و شماره ۱۲۵")).toBe("سال 1403 و شماره 125");
  });

  it("converts English digits to Persian", () => {
    expect(toPersianDigits("0123456789")).toBe("۰۱۲۳۴۵۶۷۸۹");
    expect(toPersianDigits(1403)).toBe("۱۴۰۳");
  });

  it("normalizes Arabic kaf, yeh, and removes tatweel", () => {
    expect(cleanPersianText("كتاب هاي تاريخي")).toBe("کتاب های تاریخی");
    expect(cleanPersianText("سلامــــــت")).toBe("سلامت");
  });

  it("generates clean SEO-friendly Persian slugs", () => {
    expect(toPersianSlug("آموزش جامع نکست جی‌اس ۱۵")).toBe("آموزش-جامع-نکست-جیاس-15");
    expect(toPersianSlug("React 19 & Next.js Release!")).toBe("react-19-nextjs-release");
  });
});
