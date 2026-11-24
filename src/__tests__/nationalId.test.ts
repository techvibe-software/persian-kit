import { describe, it, expect } from "vitest";
import { isValidNationalId, formatNationalId } from "../nationalId";

describe("National ID (کد ملی)", () => {
  it("validates correct national IDs", () => {
    // 0010000003: 1*8 = 8, 11 - 8 = 3 -> valid!
    expect(isValidNationalId("0010000003")).toBe(true);
    // 0079043259: sum=167, rem=2 -> 11-2=9 -> valid!
    expect(isValidNationalId("0079043259")).toBe(true);
    // 0499370899: sum=266, rem=2 -> 11-2=9 -> valid!
    expect(isValidNationalId("0499370899")).toBe(true);
  });

  it("handles Persian digits", () => {
    expect(isValidNationalId("۰۰۱۰۰۰۰۰۰۳")).toBe(true);
    expect(isValidNationalId("۰۰۷۹۰۴۳۲۵۹")).toBe(true);
  });

  it("handles 8 and 9 digit codes with auto padding", () => {
    expect(isValidNationalId("10000003")).toBe(true); // 0010000003
    expect(isValidNationalId("79043259")).toBe(true);  // 0079043259
  });

  it("rejects invalid check digits", () => {
    expect(isValidNationalId("0010000004")).toBe(false);
    expect(isValidNationalId("0079043257")).toBe(false);
  });

  it("rejects repetitive 10-digit codes", () => {
    expect(isValidNationalId("0000000000")).toBe(false);
    expect(isValidNationalId("1111111111")).toBe(false);
    expect(isValidNationalId("7777777777")).toBe(false);
  });

  it("rejects invalid lengths or non-numeric strings", () => {
    expect(isValidNationalId("123")).toBe(false);
    expect(isValidNationalId("012345678901")).toBe(false);
    expect(isValidNationalId("abcdefghij")).toBe(false);
    expect(isValidNationalId("")).toBe(false);
  });

  it("formats national ID with dashes", () => {
    expect(formatNationalId("0079043259")).toBe("007-904325-9");
    expect(formatNationalId("79043259")).toBe("007-904325-9");
  });
});
