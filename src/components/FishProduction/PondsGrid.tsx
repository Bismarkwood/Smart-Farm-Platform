import { fishBatches, ponds } from '../../data/mockData'

const statusDot = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'maintenance': return 'bg-amber-500'
    case 'empty': return 'bg-gray-400'
    default: return 'bg-gray-400'
  }
}

const waterStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-700 bg-green-50'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export default function PondsGrid() {
  return (
    <div className="space-y-6">
      {/* Pond Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ponds.map(pond => {
          const batch = fishBatches.find(b => b.id === pond.currentBatchId)
          const utilization = batch ? (batch.currentQuantity / pond.capacity) * 100 : 0

          return (
            <div key={pond.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusDot(pond.status)}`} />
                  <h4 className="font-semibold text-gray-900">{pond.name}</h4>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${waterStatusColor(pond.status)}`}>
                  {pond.status}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="text-gray-900 font-medium capitalize">{pond.type}</span>
                </div>

                {batch && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Batch</span>
                      <span className="text-gray-900 font-medium">{batch.id} • {batch.species.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stock</span>
                      <span className="text-gray-900 font-medium">{batch.currentQuantity.toLocaleString()} / {pond.capacity.toLocaleString()}</span>
                    </div>
                  </>
                )}

                {!batch && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity</span>
                    <span className="text-gray-900 font-medium">{pond.capacity.toLocaleString()} fish</span>
                  </div>
                )}

                {/* Utilization Bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Utilization</span>
                    <span className="text-gray-900 font-medium">{utilization.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        utilization > 80 ? 'bg-green-500' : utilization > 50 ? 'bg-blue-500' : utilization > 0 ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${Math.min(utilization, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pond Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB]">
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pond / Tank</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned Batch</th>
              <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Capacity</th>
              <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Stock</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Utilization</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody>
            {ponds.map(pond => {
              const batch = fishBatches.find(b => b.id === pond.currentBatchId)
              const utilization = batch ? (batch.currentQuantity / pond.capacity) * 100 : 0

              return (
                <tr key={pond.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[60px]">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{pond.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize text-gray-700">{pond.type}</td>
                  <td className="py-3 px-4 text-gray-700">{batch ? `${batch.id} (${batch.species.split(' ')[0]})` : '—'}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{pond.capacity.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    {batch ? batch.currentQuantity.toLocaleString() : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${utilization > 80 ? 'bg-green-500' : utilization > 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                          style={{ width: `${utilization}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{utilization.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      pond.status === 'active' ? 'bg-green-50 text-green-700' :
                      pond.status === 'maintenance' ? 'bg-amber-50 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {pond.status}
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
