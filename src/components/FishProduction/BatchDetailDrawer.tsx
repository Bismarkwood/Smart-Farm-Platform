import { createPortal } from 'react-dom'
import { FishFoodIcon, Activity01Icon, WaterPumpIcon, Calendar01Icon, Cancel01Icon } from 'hugeicons-react'
import { fishBatches, ponds, feedingRecords } from '../../data/mockData'
import BatchStatusBadge from './BatchStatusBadge'
import HealthStatusBadge from './HealthStatusBadge'
import SurvivalProgress from './SurvivalProgress'

interface BatchDetailDrawerProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function BatchDetailDrawer({ isOpen, onClose, batchId }: BatchDetailDrawerProps) {
  if (!isOpen || !batchId) return null

  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null

  const pond = ponds.find(p => p.id === batch.pondId)
  const batchFeedings = feedingRecords.filter(f => f.batchId === batchId)
  const survivalRate = (batch.currentQuantity / batch.quantityStocked) * 100
  const mortalityRate = (batch.mortality / batch.quantityStocked) * 100
  const totalFeedUsed = batchFeedings.reduce((sum, f) => sum + f.quantityKg, 0)

  const getHealthStatus = (): 'good' | 'watch' | 'critical' => {
    if (batch.growthStage === 'harvest-ready') return 'good'
    if (survivalRate < 90) return 'critical'
    if (survivalRate < 95) return 'watch'
    return 'good'
  }

  const stages = [
    { label: 'Stocked', date: batch.stockDate, active: true },
    { label: 'Fingerling', date: '', active: ['fingerling', 'juvenile', 'grow-out', 'harvest-ready'].includes(batch.growthStage) },
    { label: 'Juvenile', date: '', active: ['juvenile', 'grow-out', 'harvest-ready'].includes(batch.growthStage) },
    { label: 'Grow-Out', date: '', active: ['grow-out', 'harvest-ready'].includes(batch.growthStage) },
    { label: 'Harvest-Ready', date: batch.expectedHarvestDate, active: batch.growthStage === 'harvest-ready' },
  ]

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

      {/* Drawer */}
      <div className="relative ml-auto h-full w-full max-w-[460px] bg-white border-l border-gray-200 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FishFoodIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{batch.id}</h2>
                <BatchStatusBadge stage={batch.growthStage} />
              </div>
              <p className="text-xs text-gray-500">{batch.species} • {pond?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Cancel01Icon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3.5 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Current Stock</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{batch.currentQuantity.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Survival Rate</p>
              <div className="mt-1">
                <SurvivalProgress percentage={survivalRate} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 text-center border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Health</p>
              <div className="mt-2">
                <HealthStatusBadge status={getHealthStatus()} />
              </div>
            </div>
          </div>

          {/* Batch Summary */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FishFoodIcon className="w-4 h-4 text-gray-500" />
              Batch Information
            </h3>
            <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
              {[
                { label: 'Species', value: batch.species },
                { label: 'Pond / Tank', value: `${pond?.name} (${pond?.type})` },
                { label: 'Stocked Quantity', value: batch.quantityStocked.toLocaleString() },
                { label: 'Current Stock', value: batch.currentQuantity.toLocaleString() },
                { label: 'Mortality', value: `${batch.mortality} (${mortalityRate.toFixed(1)}%)` },
                { label: 'Stocking Date', value: batch.stockDate },
                { label: 'Expected Harvest', value: batch.expectedHarvestDate },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-medium text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Activity01Icon className="w-4 h-4 text-gray-500" />
              Growth Timeline
            </h3>
            <div className="relative pl-4">
              {stages.map((stage, i) => (
                <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                  {i < stages.length - 1 && (
                    <span className={`absolute left-[7px] top-5 w-0.5 h-full ${stage.active ? 'bg-green-300' : 'bg-gray-200'}`} />
                  )}
                  <span className={`relative z-10 w-3.5 h-3.5 rounded-full border-2 shrink-0 mt-0.5 ${
                    stage.active ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                  }`} />
                  <div>
                    <p className={`text-sm font-medium ${stage.active ? 'text-gray-900' : 'text-gray-400'}`}>{stage.label}</p>
                    {stage.date && <p className="text-xs text-gray-400">{stage.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feeding Summary */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <WaterPumpIcon className="w-4 h-4 text-gray-500" />
              Feeding Summary
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                <p className="text-xs text-gray-500">Total Feed Used</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">{totalFeedUsed} kg</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                <p className="text-xs text-gray-500">Last Feeding</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {batchFeedings.length > 0 ? batchFeedings[batchFeedings.length - 1].date : '—'}
                </p>
              </div>
            </div>
            {batchFeedings.length > 0 && (
              <div className="mt-3 space-y-2">
                {batchFeedings.slice(0, 4).map(feed => (
                  <div key={feed.id} className="flex items-center justify-between py-2 px-3 bg-white border border-gray-100 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">{feed.feedType}</p>
                      <p className="text-xs text-gray-400">{feed.date} • {feed.timeOfDay}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{feed.quantityKg} kg</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mortality Record */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar01Icon className="w-4 h-4 text-gray-500" />
              Mortality Record
            </h3>
            <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Losses</p>
                  <p className="text-xs text-gray-500">Since stocking date</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-red-600">{batch.mortality}</p>
                  <p className="text-xs text-gray-500">{mortalityRate.toFixed(1)}% of stocked</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Close
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              Record Mortality
            </button>
            <button className="px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
              Update Stock
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
