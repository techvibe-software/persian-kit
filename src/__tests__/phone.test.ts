import { describe, it, expect } from "vitest";
import {
  isValidIranianMobile,
  getMobileOperator,
  formatIranianMobile,
} from "../phone";

describe("Mobile Phone Validation (اعتبارسنجی شماره موبایل)", () => {
  it("validates mobile numbers in different formats", () => {
    expect(isValidIranianMobile("09123456789")).toBe(true);
    expect(isValidIranianMobile("+989123456789")).toBe(true);
    expect(isValidIranianMobile("00989123456789")).toBe(true);
    expect(isValidIranianMobile("9123456789")).toBe(true);
    expect(isValidIranianMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe(true);
  });

  it("rejects invalid mobile numbers", () => {
    expect(isValidIranianMobile("0912345678")).toBe(false); // 10 digits
    expect(isValidIranianMobile("02188776655")).toBe(false); // landline
    expect(isValidIranianMobile("08123456789")).toBe(false);
    expect(isValidIranianMobile("abc")).toBe(false);
  });

  it("identifies mobile operators correctly", () => {
    const mci = getMobileOperator("09121112233");
    expect(mci?.operator).toBe("MCI");
    expect(mci?.nameFa).toBe("همراه اول");

    const mtn = getMobileOperator("09351112233");
    expect(mtn?.operator).toBe("MTN");
    expect(mtn?.nameFa).toBe("ایرانسل");

    const rightel = getMobileOperator("09211112233");
    expect(rightel?.operator).toBe("RighTel");
    expect(rightel?.nameFa).toBe("رایتل");

    const shatel = getMobileOperator("09981112233");
    expect(shatel?.operator).toBe("Shatel");
  });

  it("formats mobile numbers in local, international and spaced formats", () => {
    expect(formatIranianMobile("+989123456789", "local")).toBe("09123456789");
    expect(formatIranianMobile("09123456789", "international")).toBe("+989123456789");
    expect(formatIranianMobile("09123456789", "spaced")).toBe("0912 345 6789");
  });
});
