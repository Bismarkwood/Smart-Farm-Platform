import { useState } from 'react'
import { WaterPumpIcon } from 'hugeicons-react'
import Modal from './Modal'
import { fishBatches, ponds } from '../../data/mockData'

interface MovePondModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function MovePondModal({ isOpen, onClose, batchId }: MovePondModalProps) {
  const [targetPond, setTargetPond] = useState('')
  const [reason, setReason] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')

  if (!batchId) return null
  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null
  const currentPond = ponds.find(p => p.id === batch.pondId)
  const availablePonds = ponds.filter(p => p.id !== batch.pondId && (p.status === 'empty' || p.status === 'maintenance'))

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Move Pond / Tank"
      subtitle={`${batch.id} • Currently in ${currentPond?.name}`}
      icon={WaterPumpIcon}
      iconBg="bg-blue-50"
      size="md"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
            Confirm Transfer
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-blue-700 font-medium">Current Location</span>
              <p className="text-xs text-blue-600">{currentPond?.type} • {batch.currentQuantity.toLocaleString()} fish</p>
            </div>
            <span className="text-lg font-bold text-blue-900">{currentPond?.name}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Transfer To *</label>
          <select
            value={targetPond}
            onChange={e => setTargetPond(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="">Select destination pond/tank</option>
            {availablePonds.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.type} — Capacity: {p.capacity.toLocaleString()})</option>
            ))}
          </select>
          {availablePonds.length === 0 && (
            <p className="text-xs text-amber-600 mt-1">No available ponds/tanks. All are currently occupied.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Transfer Date *</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason *</label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="">Select reason</option>
              <option value="water-quality">Water Quality Issue</option>
              <option value="overcrowding">Overcrowding</option>
              <option value="growth-stage">Growth Stage Change</option>
              <option value="maintenance">Pond Maintenance</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Additional transfer details..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}
