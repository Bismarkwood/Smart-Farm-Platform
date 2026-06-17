import { useState } from 'react'
import { CheckmarkCircle01Icon } from 'hugeicons-react'
import Modal from './Modal'
import { fishBatches, ponds } from '../../data/mockData'

interface MarkHarvestedModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function MarkHarvestedModal({ isOpen, onClose, batchId }: MarkHarvestedModalProps) {
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0])
  const [totalHarvested, setTotalHarvested] = useState('')
  const [avgWeight, setAvgWeight] = useState('')
  const [totalWeightKg, setTotalWeightKg] = useState('')
  const [buyer, setBuyer] = useState('')
  const [notes, setNotes] = useState('')

  if (!batchId) return null
  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null
  const pond = ponds.find(p => p.id === batch.pondId)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mark as Harvested"
      subtitle={`${batch.id} • ${batch.species} • ${pond?.name}`}
      icon={CheckmarkCircle01Icon}
      iconBg="bg-amber-50"
      size="md"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors">
            Confirm Harvest
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-amber-700 font-medium">Current Stock</span>
              <p className="text-xs text-amber-600">Expected harvest: {batch.expectedHarvestDate}</p>
            </div>
            <span className="text-lg font-bold text-amber-900">{batch.currentQuantity.toLocaleString()} fish</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Harvest Date *</label>
            <input
              type="date"
              value={harvestDate}
              onChange={e => setHarvestDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Fish Harvested *</label>
            <input
              type="number"
              value={totalHarvested}
              onChange={e => setTotalHarvested(e.target.value)}
              placeholder={`${batch.currentQuantity}`}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Avg. Weight per Fish (kg)</label>
            <input
              type="number"
              step="0.1"
              value={avgWeight}
              onChange={e => setAvgWeight(e.target.value)}
              placeholder="e.g. 1.2"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Weight (kg)</label>
            <input
              type="number"
              value={totalWeightKg}
              onChange={e => setTotalWeightKg(e.target.value)}
              placeholder="e.g. 5400"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Buyer / Destination</label>
          <input
            type="text"
            value={buyer}
            onChange={e => setBuyer(e.target.value)}
            placeholder="e.g. Accra Fresh Market"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Harvest quality, observations..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}
