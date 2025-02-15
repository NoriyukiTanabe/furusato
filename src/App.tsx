import { useState } from 'react'
import './App.css'

function App() {
  const [annualIncome, setAnnualIncome] = useState<number>(0)
  const [dependents, setDependents] = useState<number>(0)
  const [result, setResult] = useState<{
    maxDonation: number;
    taxBenefit: number;
    actualCost: number;
  } | null>(null)

  const calculateFurusato = () => {
    // 基礎控除額（住民税所得割額の20%）の簡易計算
    const estimatedResidentTax = annualIncome * 0.1 // 住民税率を10%と仮定
    const maxDonation = Math.floor(estimatedResidentTax * 0.2) // 住民税所得割額の20%

    // 実質負担額の計算（2,000円）
    const taxBenefit = maxDonation - 2000
    const actualCost = 2000

    setResult({
      maxDonation,
      taxBenefit,
      actualCost,
    })
  }

  return (
    <div className="furusato-container">
      <h1>ふるさと納税 計算シミュレーター</h1>
      <div className="input-section">
        <div className="input-group">
          <label>年収（万円）</label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            min="0"
          />
        </div>
        <div className="input-group">
          <label>扶養人数</label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => setDependents(Number(e.target.value))}
            min="0"
          />
        </div>
        <button onClick={calculateFurusato}>計算する</button>
      </div>

      {result && (
        <div className="result-section">
          <h2>計算結果</h2>
          <div className="result-item">
            <span>上限額：</span>
            <span>{result.maxDonation.toLocaleString()}円</span>
          </div>
          <div className="result-item">
            <span>税額控除額：</span>
            <span>{result.taxBenefit.toLocaleString()}円</span>
          </div>
          <div className="result-item">
            <span>実質負担額：</span>
            <span>{result.actualCost.toLocaleString()}円</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
