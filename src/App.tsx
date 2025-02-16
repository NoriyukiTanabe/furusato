import { useState } from 'react'
import { calculateFurusato } from './utils/furusato'

function App() {
  // 表示用の状態
  const [formDisplay, setFormDisplay] = useState({
    annualIncome: '',
    socialInsurance: '',
    medicalExpenses: ''
  })
  // 実際の数値データ
  const [formData, setFormData] = useState({
    annualIncome: 0,
    dependents: 0,
    socialInsurance: 0,
    medicalExpenses: 0
  })
  const [result, setResult] = useState<number | null>(null)

  const handleNumberChange = (field: string, value: string, multiplier: number = 1) => {
    // カンマを除去して数値のみにする
    const numericValue = value.replace(/,/g, '')
    if (numericValue === '') {
      setFormData(prev => ({ ...prev, [field]: 0 }))
      setFormDisplay(prev => ({ ...prev, [field]: '' }))
      return
    }
    
    const number = Number(numericValue)
    if (!isNaN(number)) {
      setFormData(prev => ({ ...prev, [field]: number * multiplier }))
      // 3桁区切りでカンマを追加
      setFormDisplay(prev => ({ ...prev, [field]: number.toLocaleString() }))
    }
  }

  const handleCalculate = () => {
    const result = calculateFurusato(
      formData.annualIncome * 10000,
      formData.dependents,
      formData.socialInsurance,
      formData.medicalExpenses
    )
    setResult(result)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
          ふるさと納税<span className="text-blue-600">シミュレーター</span>
        </h1>
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                年収（万円）
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formDisplay.annualIncome}
                onChange={(e) => handleNumberChange('annualIncome', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                placeholder="例：400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                扶養人数
              </label>
              <input
                type="number"
                value={formData.dependents}
                onChange={(e) => setFormData(prev => ({ ...prev, dependents: Number(e.target.value) }))}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                placeholder="例：2"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                社会保険料（年間）
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formDisplay.socialInsurance}
                onChange={(e) => handleNumberChange('socialInsurance', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                placeholder="例：500,000"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                医療費（年間）
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formDisplay.medicalExpenses}
                onChange={(e) => handleNumberChange('medicalExpenses', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                placeholder="例：200,000"
              />
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-[1.02] transition-all duration-200 font-semibold text-lg shadow-lg"
          >
            計算する
          </button>
        </div>

        {result && (
          <div className="mt-10 p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-600 w-2 h-8 rounded mr-3"></span>
              計算結果
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <span className="text-gray-600 font-medium">ふるさと納税の上限額</span>
                <span className="text-xl font-bold text-blue-600">{result.toLocaleString()}円</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
