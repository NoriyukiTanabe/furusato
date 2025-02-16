/**
 * ふるさと納税の計算結果を表すインターフェース
 */
// ... existing code ...
/**
 * 課税対象所得の計算に必要なパラメータを表すインターフェース
 */
export interface TaxableIncomeParams {
  /** 年間所得額 */
  annualIncome: number;
  
  /** 扶養家族の人数 */
  dependents: number;

  /** 社会保険料支払額 */
  socialInsurance: number;

  /** 医療費支払額 */
  medicalExpenses: number;
} 