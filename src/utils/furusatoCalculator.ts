interface FurusatoResult {
  maxDonation: number;  // 寄附金額の上限
  taxBenefit: number;   // 控除される税額
  actualCost: number;   // 実質的な自己負担額
}

export const calculateFurusato = (annualIncome: number, dependents: number): FurusatoResult => {
  // 住民税所得割額の計算
  // 実際の計算は複雑ですが、簡易計算として年収の10%と仮定
  // 正確には所得控除や税額控除を考慮する必要があります
  const estimatedResidentTax = annualIncome * 0.1

  // 控除上限額の計算
  const maxDonation = Math.floor(annualIncome * 0.3)
  
  // 控除額の計算（2,000円を引いた額が実際の控除対象）
  const taxBenefit = maxDonation - 2000

  // 実質負担額は2,000円固定
  const actualCost = 2000

  return {
    maxDonation,
    taxBenefit,
    actualCost
  }
} 