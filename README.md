# persian-kit

A modern, zero-dependency utility package for Persian web applications and services.

Developed and maintained by **Techvibe Studio** ([techvibe.ir](https://techvibe.ir)).

---

## Capabilities

- **National ID (کد ملی):** Checksum validation algorithm and standard formatting.
- **Currency & Amounts:** Bidirectional Rial and Toman conversions, numeric separators, and Persian formatting.
- **Number to Words:** Spoken Persian words conversion for numbers, financial amounts, and negatives.
- **Banking Utilities:** 16-digit card Luhn validation, bank identification from BIN, and Sheba (IBAN) validation.
- **Mobile Validation:** Iranian telecom operator detection (MCI, MTN, RighTel, Shatel) and standard formatting.
- **Text & Digits:** Conversions between Persian, Arabic, and ASCII digits, plus SEO slugification.

---

## Quick Example

```typescript
import {
  isValidNationalId,
  formatCurrency,
  numberToPersianWords,
  getBankByCardNumber,
  getMobileOperator,
} from "persian-kit";

// National ID
isValidNationalId("0010000003"); // true

// Currency
formatCurrency(125000, { unit: "toman", persianDigits: true });
// "۱۲۵,۰۰۰ تومان"

// Words
numberToPersianWords(1250000);
// "یک میلیون و دویست و پنجاه هزار"

// Banking
getBankByCardNumber("6037991122334455");
// { name: "بانک ملی ایران", nameEn: "Bank Melli Iran", code: "017" }

// Mobile
getMobileOperator("09123456789");
// { operator: "MCI", nameFa: "همراه اول", nameEn: "Hamrah-e Aval (MCI)" }
```

---

## Testing

```bash
bun test
```

All 32 unit tests run in ~12ms with zero external runtime dependencies.

---

## License

MIT © Techvibe Studio
