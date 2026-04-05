/**
 * Arabic number-to-words (Tafqeet) converter
 * Converts numbers up to 999,999,999 to Arabic words
 */

const ONES = [
  "", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة",
  "ستة", "سبعة", "ثمانية", "تسعة", "عشرة",
  "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر",
  "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر",
];

const TENS = [
  "", "", "عشرون", "ثلاثون", "أربعون", "خمسون",
  "ستون", "سبعون", "ثمانون", "تسعون",
];

const HUNDREDS = [
  "", "مائة", "مئتان", "ثلاثمائة", "أربعمائة", "خمسمائة",
  "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة",
];

function numberBelow1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ONES[n];

  const h = Math.floor(n / 100);
  const remainder = n % 100;
  const t = Math.floor(remainder / 10);
  const o = remainder % 10;

  const parts: string[] = [];
  if (h > 0) parts.push(HUNDREDS[h]);

  if (remainder > 0 && remainder < 20) {
    parts.push(ONES[remainder]);
  } else {
    if (o > 0) parts.push(ONES[o]);
    if (t > 0) parts.push(TENS[t]);
  }

  return parts.join(" و");
}

export type CurrencyCode = "EGP" | "SAR" | "AED" | "USD" | "KWD";

interface CurrencyConfig {
  main: string;
  mainPlural: string;
  sub: string;
  subPlural: string;
  subDivisor: number; // cents per main unit
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EGP: { main: "جنيه مصري", mainPlural: "جنيهاً مصرياً", sub: "قرش", subPlural: "قرشاً", subDivisor: 100 },
  SAR: { main: "ريال سعودي", mainPlural: "ريالاً سعودياً", sub: "هللة", subPlural: "هللة", subDivisor: 100 },
  AED: { main: "درهم إماراتي", mainPlural: "درهماً إماراتياً", sub: "فلس", subPlural: "فلساً", subDivisor: 100 },
  USD: { main: "دولار أمريكي", mainPlural: "دولاراً أمريكياً", sub: "سنت", subPlural: "سنتاً", subDivisor: 100 },
  KWD: { main: "دينار كويتي", mainPlural: "ديناراً كويتياً", sub: "فلس", subPlural: "فلساً", subDivisor: 1000 },
};

export function tafqeet(amount: number, currency: CurrencyCode = "EGP"): string {
  if (isNaN(amount) || amount < 0) return "رقم غير صحيح";
  if (amount === 0) return `صفر ${CURRENCIES[currency].mainPlural} لا غير`;
  if (amount > 999_999_999_999) return "الرقم أكبر من النطاق المسموح";

  const cfg = CURRENCIES[currency];
  const rounded = Math.round(amount * cfg.subDivisor) / cfg.subDivisor;
  const mainPart = Math.floor(rounded);
  const subPart = Math.round((rounded - mainPart) * cfg.subDivisor);

  const parts: string[] = [];

  // Millions
  const millions = Math.floor(mainPart / 1_000_000);
  const thousands = Math.floor((mainPart % 1_000_000) / 1_000);
  const remainder = mainPart % 1_000;

  if (millions > 0) {
    if (millions === 1) parts.push("مليون");
    else if (millions === 2) parts.push("مليونان");
    else if (millions <= 10) parts.push(`${numberBelow1000(millions)} ملايين`);
    else parts.push(`${numberBelow1000(millions)} مليون`);
  }

  if (thousands > 0) {
    if (thousands === 1) parts.push("ألف");
    else if (thousands === 2) parts.push("ألفان");
    else if (thousands <= 10) parts.push(`${numberBelow1000(thousands)} آلاف`);
    else parts.push(`${numberBelow1000(thousands)} ألفاً`);
  }

  if (remainder > 0) {
    parts.push(numberBelow1000(remainder));
  }

  const mainText = parts.join(" و");
  const mainUnit = mainPart === 1 ? cfg.main : cfg.mainPlural;
  let result = `${mainText} ${mainUnit}`;

  if (subPart > 0) {
    const subText = numberBelow1000(subPart);
    const subUnit = subPart === 1 ? cfg.sub : cfg.subPlural;
    result += ` و${subText} ${subUnit}`;
  }

  return result + " لا غير";
}
