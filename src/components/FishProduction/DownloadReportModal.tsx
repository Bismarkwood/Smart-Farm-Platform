import { Download04Icon, Leaf01Icon } from 'hugeicons-react'
import Modal from './Modal'
import { fishBatches, ponds, feedingRecords } from '../../data/mockData'
import SurvivalProgress from './SurvivalProgress'

interface DownloadReportModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function DownloadReportModal({ isOpen, onClose, batchId }: DownloadReportModalProps) {
  if (!batchId) return null
  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null
  const pond = ponds.find(p => p.id === batch.pondId)
  const batchFeedings = feedingRecords.filter(f => f.batchId === batchId)
  const survivalRate = (batch.currentQuantity / batch.quantityStocked) * 100
  const mortalityRate = (batch.mortality / batch.quantityStocked) * 100
  const totalFeedUsed = batchFeedings.reduce((sum, f) => sum + f.quantityKg, 0)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Batch Report"
      subtitle="Preview and download"
      icon={Download04Icon}
      iconBg="bg-blue-50"
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Close
          </button>
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
            Download PDF
          </button>
        </>
      }
    >
      {/* Branded Report Preview */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Report Header */}
        <div className="bg-[#0B2F18] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center">
                <Leaf01Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Mordecai Farms</h3>
                <p className="text-green-300/70 text-xs">Smart Farm Operations Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">Batch Production Report</p>
              <p className="text-green-300/70 text-xs">Generated: June 17, 2026</p>
            </div>
          </div>
        </div>

        {/* Report Body */}
        <div className="p-6 space-y-6">
          {/* Batch Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h4 className="text-xl font-bold text-gray-900">{batch.id}</h4>
              <p className="text-sm text-gray-500">{batch.species}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-900">{pond?.name}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900 mb-3">Key Performance Metrics</h5>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <p className="text-xs text-gray-500">Stocked</p>
                <p className="text-lg font-bold text-gray-900">{batch.quantityStocked.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <p className="text-xs text-gray-500">Current</p>
                <p className="text-lg font-bold text-gray-900">{batch.currentQuantity.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <p className="text-xs text-gray-500">Survival</p>
                <div className="mt-1"><SurvivalProgress percentage={survivalRate} /></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                <p className="text-xs text-gray-500">Mortality</p>
                <p className="text-lg font-bold text-red-600">{batch.mortality}</p>
                <p className="text-xs text-gray-400">{mortalityRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div>
            <h5 className="text-sm font-semibold text-gray-900 mb-3">Batch Details</h5>
            <table className="w-full text-sm border border-gray-100 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Species', batch.species],
                  ['Growth Stage', batch.growthStage.replace('-', ' ')],
                  ['Pond / Tank', `${pond?.name} (${pond?.type})`],
                  ['Stocking Date', batch.stockDate],
                  ['Expected Harvest', batch.expectedHarvestDate],
                  ['Total Feed Used', `${totalFeedUsed} kg`],
                  ['Feeding Records', `${batchFeedings.length} entries`],
                ].map(([label, value], i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-4 py-2.5 text-gray-500 font-medium">{label}</td>
                    <td className="px-4 py-2.5 text-gray-900 font-medium text-right capitalize">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <p>Powered by BigData Ghana Limited</p>
            <p>Report ID: RPT-{batch.id}-{Date.now().toString(36).slice(-4).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
