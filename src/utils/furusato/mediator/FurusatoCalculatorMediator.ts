import { FurusatoResult } from '../interfaces/types';
import { DEDUCTION_AMOUNTS } from '../constants/deductionAmounts';
import { TaxableIncomeCalculator } from '../calculators/TaxableIncomeCalculator';

/**
 * ふるさと納税計算のメディエーター
 * 各計算クラスを統合して最終的な結果を生成する
 */
export class FurusatoCalculatorMediator {
  /**
   * ふるさと納税の計算を実行する
   * @param annualIncome - 年間所得額
   * @param dependents - 扶養家族の人数
   * @param socialInsurance - 社会保険料支払額
   * @param medicalExpenses - 医療費支払額
   * @returns ふるさと納税の計算結果（上限額、控除額、実質負担額）
   */
  static calculate(
    annualIncome: number,
    dependents: number,
    socialInsurance: number,
    medicalExpenses: number
  ): FurusatoResult {
    // 課税対象所得を計算
    const taxableIncome = TaxableIncomeCalculator.calculate({
      annualIncome,
      dependents,
      socialInsurance,
      medicalExpenses
    });

    // 住民税所得割額を計算
    const residentTax = taxableIncome * DEDUCTION_AMOUNTS.RESIDENT_TAX_RATE;
    
    // ふるさと納税の上限額を計算（住民税所得割額の20%）
    const maxDonation = Math.floor(residentTax * DEDUCTION_AMOUNTS.DONATION_LIMIT_RATE);
    
    // 控除額を計算（上限額から最小負担額を引いた額）
    const taxBenefit = maxDonation - DEDUCTION_AMOUNTS.MINIMUM_DONATION_COST;
    
    return {
      maxDonation,
      taxBenefit,
      actualCost: DEDUCTION_AMOUNTS.MINIMUM_DONATION_COST
    };
  }
} 