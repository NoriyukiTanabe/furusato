/**
 * ふるさと納税の計算結果を表すインターフェース
 */
export interface FurusatoResult {
  /** 寄附金額の上限（住民税所得割額の20%） */
  maxDonation: number;
  
  /** 控除される税額（寄附金額から2000円を引いた額） */
  taxBenefit: number;
  
  /** 実質的な自己負担額（2000円固定） */
  actualCost: number;
}

/**
 * 課税対象所得の計算に必要なパラメータを表すインターフェース
 */
export interface TaxableIncomeParams {
  /** 年間所得額 */
  annualIncome: number;
  
  /** 扶養家族の人数 */
  dependents: number;
} 