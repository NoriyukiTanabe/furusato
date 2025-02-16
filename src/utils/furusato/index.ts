import { FurusatoCalculatorMediator } from './mediator/FurusatoCalculatorMediator';

/**
 * ふるさと納税の上限額を計算する関数
 * @param annualIncome - 年間所得額
 * @param dependents - 扶養家族の人数
 * @param socialInsurance - 社会保険料支払額
 * @param medicalExpenses - 医療費支払額
 * @returns ふるさと納税の上限額
 */
export const calculateFurusato = (
  annualIncome: number,
  dependents: number,
  socialInsurance: number,
  medicalExpenses: number
): number => {
  return FurusatoCalculatorMediator.calculate(annualIncome, dependents, socialInsurance, medicalExpenses);
}; 