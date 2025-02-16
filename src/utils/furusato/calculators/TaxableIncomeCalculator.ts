import { TaxableIncomeParams } from '../interfaces/types';
import { EmploymentIncomeCalculator } from './EmploymentIncomeCalculator';
import { DeductionCalculator } from './DeductionCalculator';

/**
 * 課税対象所得を計算するクラス
 * 年収から給与所得控除と各種控除を差し引いて課税対象所得を算出する
 */
export class TaxableIncomeCalculator {
  /**
   * 課税対象所得を計算する
   * @param params - 計算に必要なパラメータ（年間所得額と扶養家族数）
   * @returns 課税対象所得額
   */
  static calculate(params: TaxableIncomeParams): number {
    const { annualIncome, dependents } = params;
    
    // 給与所得控除を計算
    const employmentDeduction = EmploymentIncomeCalculator.calculate(annualIncome);
    
    // その他の控除額を計算
    const totalDeductions = DeductionCalculator.calculate(dependents);
    
    // 課税対象所得を計算（マイナスにならないよう0円で下限を設定）
    return Math.max(0, annualIncome - employmentDeduction - totalDeductions);
  }
} 