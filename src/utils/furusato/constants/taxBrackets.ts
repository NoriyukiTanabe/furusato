/**
 * 所得税率と給与所得控除に関する定数定義
 * 国税庁の定める税率表に基づく値
 */
export const TAX_BRACKETS = {
  /** 所得税率の段階的な閾値と税率 */
  INCOME_TAX: [
    { threshold: 1950000, rate: 0.05 },  // 195万円以下
    { threshold: 3300000, rate: 0.10 },  // 330万円以下
    { threshold: 6950000, rate: 0.20 },  // 695万円以下
    { threshold: 9000000, rate: 0.23 },  // 900万円以下
    { threshold: 18000000, rate: 0.33 }, // 1800万円以下
    { threshold: 40000000, rate: 0.40 }, // 4000万円以下
    { threshold: Infinity, rate: 0.45 }   // 4000万円超
  ],
  
  /** 給与所得控除の段階的な閾値、基本額、控除率 */
  EMPLOYMENT_DEDUCTION: [
    { threshold: 1625000, base: 550000, rate: 0 },    // 162.5万円以下
    { threshold: 1800000, base: 0, rate: 0.4 },       // 180万円以下
    { threshold: 3600000, base: 180000, rate: 0.3 },  // 360万円以下
    { threshold: 6600000, base: 540000, rate: 0.2 },  // 660万円以下
    { threshold: 8500000, base: 1200000, rate: 0.1 }, // 850万円以下
    { threshold: Infinity, base: 1950000, rate: 0 }    // 850万円超
  ]
} as const; 