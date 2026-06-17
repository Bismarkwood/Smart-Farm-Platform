import { FishFoodIcon, Dollar01Icon, Alert02Icon, Clock01Icon } from 'hugeicons-react'
import { feedingRecords, fishBatches, ponds } from '../../data/mockData'

const feedCostPerKg = 3.5 // GH₵ per kg

export default function FeedingRecordsTab() {
  const totalFeedUsed = feedingRecords.reduce((sum, r) => sum + r.quantityKg, 0)
  const totalFeedCost = totalFeedUsed * feedCostPerKg

  return (
    <div className="space-y-5">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FishFoodIcon className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-500 font-medium">Total Feed Used</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{totalFeedUsed} kg</p>
          <p className="text-xs text-gray-400">Today's records</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Dollar01Icon className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500 font-medium">Feed Cost</span>
          </div>
          <p className="text-lg font-bold text-gray-900">GH₵ {totalFeedCost.toFixed(0)}</p>
          <p className="text-xs text-gray-400">@ GH₵{feedCostPerKg}/kg avg</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Alert02Icon className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-500 font-medium">Missed Feeding</span>
          </div>
          <p className="text-lg font-bold text-gray-900">0</p>
          <p className="text-xs text-gray-400">All schedules completed</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Clock01Icon className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-gray-500 font-medium">Next Feeding</span>
          </div>
          <p className="text-lg font-bold text-gray-900">5:00 PM</p>
          <p className="text-xs text-gray-400">Evening schedule</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB]">
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Batch</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pond / Tank</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Feed Type</th>
              <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Qty (kg)</th>
              <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cost (GH₵)</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {feedingRecords.map(record => {
              const batch = fishBatches.find(b => b.id === record.batchId)
              const pond = batch ? ponds.find(p => p.id === batch.pondId) : null
              const cost = record.quantityKg * feedCostPerKg

              return (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[60px]">
                  <td className="py-3 px-4 text-gray-700">{record.date}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{record.batchId}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{pond?.name || '—'}</td>
                  <td className="py-3 px-4 text-gray-700">{record.feedType}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">{record.quantityKg}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{cost.toFixed(0)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      record.timeOfDay === 'morning' ? 'bg-blue-50 text-blue-700' :
                      record.timeOfDay === 'afternoon' ? 'bg-amber-50 text-amber-700' :
                      'bg-purple-50 text-purple-700'
                    }`}>
                      {record.timeOfDay}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      Completed
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
