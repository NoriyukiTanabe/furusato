import { TAX_BRACKETS } from '../constants/taxBrackets';

/**
 * 給与所得控除を計算するクラス
 * 給与所得控除は年収に応じて段階的に計算される
 */
export class EmploymentIncomeCalculator {
  /**
   * 給与所得控除額を計算する
   * @param annualIncome - 年間所得額
   * @returns 給与所得控除額
   */
  static calculate(annualIncome: number): number {
    // 年収に応じた控除率と基本額を取得
    const bracket = TAX_BRACKETS.EMPLOYMENT_DEDUCTION.find(
      bracket => annualIncome <= bracket.threshold
    )!;
    
    // 控除率が0の場合は基本額をそのまま返す
    // それ以外の場合は、年収に控除率を掛けて基本額を加算
    return bracket.rate === 0 
      ? bracket.base 
      : annualIncome * bracket.rate + bracket.base;
  }
} 