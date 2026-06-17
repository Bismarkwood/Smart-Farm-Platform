import { FishFoodIcon, Activity01Icon, WaterPumpIcon, Calendar01Icon } from 'hugeicons-react'
import { fishBatches, ponds, feedingRecords } from '../../data/mockData'
import BatchStatusBadge from './BatchStatusBadge'
import HealthStatusBadge from './HealthStatusBadge'
import SurvivalProgress from './SurvivalProgress'
import Modal from './Modal'

interface BatchDetailModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function BatchDetailModal({ isOpen, onClose, batchId }: BatchDetailModalProps) {
  if (!batchId) return null

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={batch.id}
      subtitle={`${batch.species} • ${pond?.name}`}
      icon={FishFoodIcon}
      iconBg="bg-blue-50"
      size="xl"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Close
          </button>
          <button className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Record Mortality
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm">
            Update Stock
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Top badges */}
        <div className="flex items-center gap-2">
          <BatchStatusBadge stage={batch.growthStage} />
          <HealthStatusBadge status={getHealthStatus()} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Stocked</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{batch.quantityStocked.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Current Stock</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{batch.currentQuantity.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Survival Rate</p>
            <div className="mt-1">
              <SurvivalProgress percentage={survivalRate} />
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Mortality</p>
            <p className="text-xl font-bold text-red-600 mt-1">{batch.mortality}</p>
            <p className="text-xs text-gray-400">{mortalityRate.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
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
                  { label: 'Capacity', value: `${pond?.capacity.toLocaleString()} fish` },
                  { label: 'Stocking Date', value: batch.stockDate },
                  { label: 'Expected Harvest', value: batch.expectedHarvestDate },
                  { label: 'Growth Stage', value: batch.growthStage.replace('-', ' ') },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortality */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar01Icon className="w-4 h-4 text-gray-500" />
                Mortality Record
              </h3>
              <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total Losses</p>
                    <p className="text-xs text-gray-500">Since stocking date ({batch.stockDate})</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{batch.mortality}</p>
                    <p className="text-xs text-gray-500">{mortalityRate.toFixed(1)}% of stocked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Growth Timeline */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Activity01Icon className="w-4 h-4 text-gray-500" />
                Growth Timeline
              </h3>
              <div className="relative pl-4">
                {stages.map((stage, i) => (
                  <div key={i} className="relative flex items-start gap-3 pb-5 last:pb-0">
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
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                  <p className="text-xs text-gray-500">Total Feed</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{totalFeedUsed} kg</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                  <p className="text-xs text-gray-500">Records</p>
                  <p className="text-lg font-bold text-gray-900 mt-0.5">{batchFeedings.length}</p>
                </div>
              </div>
              {batchFeedings.length > 0 && (
                <div className="space-y-2">
                  {batchFeedings.slice(0, 3).map(feed => (
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
          </div>
        </div>
      </div>
    </Modal>
  )
}
