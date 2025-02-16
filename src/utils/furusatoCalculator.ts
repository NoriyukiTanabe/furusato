interface FurusatoResult {
  maxDonation: number;  // 寄附金額の上限
  taxBenefit: number;   // 控除される税額
  actualCost: number;   // 実質的な自己負担額
}

export const calculateFurusato = (annualIncome: number, dependents: number): FurusatoResult => {
  // 所得税率の概算（簡易的な計算）
  const incomeTaxRate = 
    annualIncome <= 1950000 ? 0.05 :
    annualIncome <= 3300000 ? 0.10 :
    annualIncome <= 6950000 ? 0.20 :
    annualIncome <= 9000000 ? 0.23 :
    annualIncome <= 18000000 ? 0.33 :
    annualIncome <= 40000000 ? 0.40 : 0.45;

  // 住民税所得割額の計算（標準税率10%）
  // 年収から給与所得控除と基礎控除を差し引いて課税所得を計算
  const employmentDeduction = 
    annualIncome <= 1625000 ? 550000 :
    annualIncome <= 1800000 ? annualIncome * 0.4 :
    annualIncome <= 3600000 ? annualIncome * 0.3 + 180000 :
    annualIncome <= 6600000 ? annualIncome * 0.2 + 540000 :
    annualIncome <= 8500000 ? annualIncome * 0.1 + 1200000 : 1950000;

  const basicDeduction = 480000;  // 基礎控除
  const dependentDeduction = 380000 * dependents;  // 扶養控除

  const taxableIncome = Math.max(0, annualIncome - employmentDeduction - basicDeduction - dependentDeduction);
  const residentTax = taxableIncome * 0.1;  // 住民税所得割額（10%）

  // 控除上限額の計算（住民税所得割額の20%）
  const maxDonation = Math.floor(residentTax * 0.2);  // 住民税所得割額の20%が上限
  
  // 控除額の計算
  const taxBenefit = maxDonation - 2000;  // 寄附金額から2000円を引いた額が控除額
  const actualCost = 2000;  // 実質負担額は2000円固定

  return {
    maxDonation,
    taxBenefit,
    actualCost
  }
} 