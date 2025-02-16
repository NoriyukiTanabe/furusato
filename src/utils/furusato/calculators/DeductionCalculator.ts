import { DEDUCTION_AMOUNTS } from '../constants/deductionAmounts';

/**
 * 各種控除額を計算するクラス
 * 基礎控除、扶養控除、社会保険料控除、医療費控除の合計額を計算する
 */
export class DeductionCalculator {
  /**
   * 控除総額を計算する
   * @param dependents - 扶養家族の人数
   * @param socialInsurance - 社会保険料支払額
   * @param medicalExpenses - 医療費支払額
   * @param annualIncome - 年間所得額
   * @returns すべての控除の合計額
   */
  static calculate(dependents: number, socialInsurance: number, medicalExpenses: number, annualIncome: number): number {
    // 基礎控除額を取得
    const basicDeduction = DEDUCTION_AMOUNTS.BASIC;
    
    // 扶養控除額を計算（扶養家族数 × 1人あたりの控除額）
    const dependentDeduction = DEDUCTION_AMOUNTS.DEPENDENT * dependents;
    
    // 社会保険料控除額（全額控除）
    const socialInsuranceDeduction = socialInsurance;
    
    // 医療費控除額を計算
    // 医療費が10万円を超えた分、または年収の5%を超えた分のいずれか低い方を控除
    const medicalDeduction = Math.max(0, Math.min(
      medicalExpenses - 100000,
      medicalExpenses - (annualIncome * 0.05)
    ));
    
    // 合計控除額を返す
    return basicDeduction + dependentDeduction + socialInsuranceDeduction + medicalDeduction;
  }
} 