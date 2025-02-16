import { DEDUCTION_AMOUNTS } from '../constants/deductionAmounts';
import { TaxableIncomeCalculator } from '../calculators/TaxableIncomeCalculator';
import { TAX_BRACKETS } from '../constants/taxBrackets';

/**
 * ふるさと納税計算のメディエーター
 * 各計算クラスを統合して最終的な結果を生成する
 */
export class FurusatoCalculatorMediator {
  /**
   * 所得税率を取得する
   * @param taxableIncome - 課税対象所得
   * @returns 所得税率
   */
  private static getIncomeTaxRate(taxableIncome: number): number {
    const bracket = TAX_BRACKETS.INCOME_TAX.find(
      bracket => taxableIncome <= bracket.threshold
    )!;
    return bracket.rate;
  }

  /**
   * ふるさと納税の上限額を計算する
   * @param annualIncome - 年間所得額
   * @param dependents - 扶養家族の人数
   * @param socialInsurance - 社会保険料支払額
   * @param medicalExpenses - 医療費支払額
   * @returns ふるさと納税の上限額
   */
  static calculate(
    annualIncome: number,
    dependents: number,
    socialInsurance: number,
    medicalExpenses: number
  ): number {
    // 課税対象所得を計算
    const taxableIncome = TaxableIncomeCalculator.calculate({
      annualIncome,
      dependents,
      socialInsurance,
      medicalExpenses
    });

    // 住民税所得割額を計算
    const residentTax = taxableIncome * DEDUCTION_AMOUNTS.RESIDENT_TAX_RATE;
    
    // 所得税率を取得
    const incomeTaxRate = this.getIncomeTaxRate(taxableIncome);
    
    // 特別控除の割合を計算（100% - 10% - 所得税率）
    const specialDeductionRate = 1 - 0.1 - incomeTaxRate;
    
    // ふるさと納税の上限額を計算
    // 特別控除額（住民税所得割額の20%）を特別控除の割合で割り戻して総額を算出
    return Math.floor((residentTax * DEDUCTION_AMOUNTS.DONATION_LIMIT_RATE) / specialDeductionRate);
  }
} 