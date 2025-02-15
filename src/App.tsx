import { useState } from 'react'
import { calculateFurusato } from './utils/furusatoCalculator'

function App() {
  const [annualIncome, setAnnualIncome] = useState<number>(0)
  const [dependents, setDependents] = useState<number>(0)
  const [result, setResult] = useState<{
    maxDonation: number;
    taxBenefit: number;
    actualCost: number;
  } | null>(null)

  const handleCalculate = () => {
    const result = calculateFurusato(annualIncome, dependents)
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
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                min="0"
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
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value))}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                placeholder="例：2"
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
                <span className="text-gray-600 font-medium">上限額</span>
                <span className="text-xl font-bold text-blue-600">{result.maxDonation.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <span className="text-gray-600 font-medium">税額控除額</span>
                <span className="text-xl font-bold text-green-600">{result.taxBenefit.toLocaleString()}円</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <span className="text-gray-600 font-medium">実質負担額</span>
                <span className="text-xl font-bold text-red-600">{result.actualCost.toLocaleString()}円</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
