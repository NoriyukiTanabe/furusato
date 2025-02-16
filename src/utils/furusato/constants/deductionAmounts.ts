/**
 * 控除額と税率に関する定数定義
 */
export const DEDUCTION_AMOUNTS = {
  /** 基礎控除額（年間） */
  BASIC: 480000,
  
  /** 扶養控除額（1人あたり年間） */
  DEPENDENT: 380000,
  
  /** ふるさと納税の最小負担額 */
  MINIMUM_DONATION_COST: 2000,
  
  /** 住民税の標準税率 */
  RESIDENT_TAX_RATE: 0.1,
  
  /** ふるさと納税の控除上限率（住民税所得割額に対する比率） */
  DONATION_LIMIT_RATE: 0.2
} as const; 