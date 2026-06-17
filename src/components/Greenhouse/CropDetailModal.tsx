import { Plant01Icon, Calendar01Icon, BarChartIcon, Leaf01Icon } from 'hugeicons-react'
import { cropBatches, greenhouses } from '../../data/mockData'
import Modal from '../FishProduction/Modal'

interface CropDetailModalProps {
  isOpen: boolean
  onClose: () => void
  cropId: string | null
}

export default function CropDetailModal({ isOpen, onClose, cropId }: CropDetailModalProps) {
  if (!cropId) return null
  const crop = cropBatches.find(c => c.id === cropId)
  if (!crop) return null
  const gh = greenhouses.find(g => g.id === crop.greenhouseId)

  const yieldPercent = crop.actualYieldKg ? ((crop.actualYieldKg / crop.expectedYieldKg) * 100).toFixed(0) : null
  const daysToHarvest = Math.max(0, Math.ceil((new Date(crop.expectedHarvestDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  const statusStyles: Record<string, string> = {
    growing: 'bg-blue-50 text-blue-700',
    harvested: 'bg-green-50 text-green-700',
    failed: 'bg-red-50 text-red-700',
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${crop.cropType} — ${crop.variety}`}
      subtitle={`${crop.id} • ${gh?.name}`}
      icon={Plant01Icon}
      iconBg="bg-green-50"
      size="xl"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Close
          </button>
          {crop.status === 'growing' && (
            <button className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
              Record Harvest
            </button>
          )}
        </>
      }
    >
      <div className="space-y-6">
        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[crop.status]}`}>
            {crop.status}
          </span>
          {crop.status === 'growing' && daysToHarvest <= 7 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
              Harvest in {daysToHarvest} days
            </span>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Expected Yield</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{crop.expectedYieldKg} kg</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Actual Yield</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{crop.actualYieldKg ? `${crop.actualYieldKg} kg` : '—'}</p>
            {yieldPercent && <p className="text-xs text-green-600">{yieldPercent}% of target</p>}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Available Stock</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{crop.availableStockKg} kg</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">Days to Harvest</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{crop.status === 'growing' ? daysToHarvest : '—'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Leaf01Icon className="w-4 h-4 text-gray-500" />
              Crop Information
            </h3>
            <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
              {[
                { label: 'Crop Type', value: crop.cropType },
                { label: 'Variety', value: crop.variety },
                { label: 'Greenhouse', value: gh?.name || '—' },
                { label: 'Greenhouse Size', value: `${gh?.sizeSqm} sqm` },
                { label: 'Status', value: crop.status },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar01Icon className="w-4 h-4 text-gray-500" />
              Crop Timeline
            </h3>
            <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
              {[
                { label: 'Planting Date', value: crop.plantingDate },
                { label: 'Expected Harvest', value: crop.expectedHarvestDate },
                { label: 'Actual Harvest', value: crop.actualHarvestDate || 'Pending' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-medium text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Yield Performance */}
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-5 flex items-center gap-2">
              <BarChartIcon className="w-4 h-4 text-gray-500" />
              Yield Performance
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Target vs Actual</span>
                <span className="text-sm font-medium text-gray-900">{crop.actualYieldKg || 0} / {crop.expectedYieldKg} kg</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${crop.actualYieldKg ? 'bg-green-500' : 'bg-blue-300'}`}
                  style={{ width: `${crop.actualYieldKg ? (crop.actualYieldKg / crop.expectedYieldKg) * 100 : 0}%` }}
                />
              </div>
              {!crop.actualYieldKg && crop.status === 'growing' && (
                <p className="text-xs text-gray-400 mt-2">Yield will be recorded at harvest</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
