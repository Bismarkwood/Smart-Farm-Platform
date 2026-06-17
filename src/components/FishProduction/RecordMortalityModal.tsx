import { useState } from 'react'
import { SkullIcon } from 'hugeicons-react'
import Modal from './Modal'
import { fishBatches, ponds } from '../../data/mockData'

interface RecordMortalityModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function RecordMortalityModal({ isOpen, onClose, batchId }: RecordMortalityModalProps) {
  const [quantity, setQuantity] = useState('')
  const [cause, setCause] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [observation, setObservation] = useState('')
  const [actionTaken, setActionTaken] = useState('')

  if (!batchId) return null
  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null
  const pond = ponds.find(p => p.id === batch.pondId)

  const currentMortalityRate = ((batch.mortality / batch.quantityStocked) * 100).toFixed(1)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Mortality"
      subtitle={`${batch.id} • ${batch.species} • ${pond?.name}`}
      icon={SkullIcon}
      iconBg="bg-red-50"
      size="md"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm">
            Record Mortality
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-red-700">Total Mortality to Date</span>
              <p className="text-xs text-red-500">Rate: {currentMortalityRate}%</p>
            </div>
            <span className="text-lg font-bold text-red-900">{batch.mortality} fish</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Deaths *</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="e.g. 15"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Probable Cause *</label>
          <select
            value={cause}
            onChange={e => setCause(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          >
            <option value="">Select cause</option>
            <option value="disease">Disease / Infection</option>
            <option value="water-quality">Poor Water Quality</option>
            <option value="low-oxygen">Low Oxygen Levels</option>
            <option value="overcrowding">Overcrowding</option>
            <option value="feed-rejection">Feed Rejection</option>
            <option value="predation">Predation</option>
            <option value="handling">Handling Stress</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Observation</label>
          <textarea
            value={observation}
            onChange={e => setObservation(e.target.value)}
            rows={2}
            placeholder="Describe what was observed..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Action Taken</label>
          <textarea
            value={actionTaken}
            onChange={e => setActionTaken(e.target.value)}
            rows={2}
            placeholder="What remedial action was taken..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}
