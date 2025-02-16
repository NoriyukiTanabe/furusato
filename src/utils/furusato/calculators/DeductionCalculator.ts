import { DEDUCTION_AMOUNTS } from '../constants/deductionAmounts';

/**
 * 各種控除額を計算するクラス
 * 基礎控除と扶養控除の合計額を計算する
 */
export class DeductionCalculator {
  /**
   * 控除総額を計算する
   * @param dependents - 扶養家族の人数
   * @returns 基礎控除と扶養控除の合計額
   */
  static calculate(dependents: number): number {
    // 基礎控除額を取得
    const basicDeduction = DEDUCTION_AMOUNTS.BASIC;
    
    // 扶養控除額を計算（扶養家族数 × 1人あたりの控除額）
    const dependentDeduction = DEDUCTION_AMOUNTS.DEPENDENT * dependents;
    
    // 合計控除額を返す
    return basicDeduction + dependentDeduction;
  }
} 