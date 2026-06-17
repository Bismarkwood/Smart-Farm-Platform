import { useState } from 'react'
import { FishFoodIcon } from 'hugeicons-react'
import Modal from './Modal'
import { fishBatches, ponds } from '../../data/mockData'

interface AddFeedingModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function AddFeedingModal({ isOpen, onClose, batchId }: AddFeedingModalProps) {
  const [feedType, setFeedType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')

  if (!batchId) return null
  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null
  const pond = ponds.find(p => p.id === batch.pondId)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Feeding Record"
      subtitle={`${batch.id} • ${batch.species} • ${pond?.name}`}
      icon={FishFoodIcon}
      iconBg="bg-green-50"
      size="md"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
            Save Record
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Feed Type *</label>
            <select
              value={feedType}
              onChange={e => setFeedType(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="">Select feed</option>
              <option value="coppens-2mm">Coppens 2mm</option>
              <option value="coppens-4mm">Coppens 4mm</option>
              <option value="coppens-6mm">Coppens 6mm</option>
              <option value="tilapia-3mm">Tilapia Feed 3mm</option>
              <option value="local-feed">Local Feed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (kg) *</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Time of Day *</label>
            <select
              value={timeOfDay}
              onChange={e => setTimeOfDay(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="">Select time</option>
              <option value="morning">Morning (6AM–10AM)</option>
              <option value="afternoon">Afternoon (12PM–3PM)</option>
              <option value="evening">Evening (5PM–7PM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Any feeding observations..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}
