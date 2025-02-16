import { FurusatoCalculatorMediator } from './mediator/FurusatoCalculatorMediator';
import type { FurusatoResult } from './interfaces/types';

/**
 * ふるさと納税の計算を実行する関数
 * @param annualIncome - 年間所得額
 * @param dependents - 扶養家族の人数
 * @param socialInsurance - 社会保険料支払額
 * @param medicalExpenses - 医療費支払額
 * @returns ふるさと納税の計算結果（上限額、控除額、実質負担額）
 */
export const calculateFurusato = (
  annualIncome: number,
  dependents: number,
  socialInsurance: number,
  medicalExpenses: number
): FurusatoResult => {
  return FurusatoCalculatorMediator.calculate(annualIncome, dependents, socialInsurance, medicalExpenses);
};

// 型定義のエクスポート
export type { FurusatoResult }; 