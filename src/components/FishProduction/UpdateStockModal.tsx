import { useState } from 'react'
import { ChartIncreaseIcon } from 'hugeicons-react'
import Modal from './Modal'
import { fishBatches, ponds } from '../../data/mockData'

interface UpdateStockModalProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | null
}

export default function UpdateStockModal({ isOpen, onClose, batchId }: UpdateStockModalProps) {
  const [newStock, setNewStock] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  if (!batchId) return null
  const batch = fishBatches.find(b => b.id === batchId)
  if (!batch) return null
  const pond = ponds.find(p => p.id === batch.pondId)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Stock"
      subtitle={`${batch.id} • ${batch.species} • ${pond?.name}`}
      icon={ChartIncreaseIcon}
      iconBg="bg-blue-50"
      size="md"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm">
            Update Stock
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Current Stock</span>
            <span className="text-lg font-bold text-blue-900">{batch.currentQuantity.toLocaleString()} fish</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">New Stock Count *</label>
          <input
            type="number"
            value={newStock}
            onChange={e => setNewStock(e.target.value)}
            placeholder={`e.g. ${batch.currentQuantity}`}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for Update *</label>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="">Select reason</option>
            <option value="count-correction">Stock Count Correction</option>
            <option value="new-addition">New Fish Added</option>
            <option value="transfer-in">Transfer In</option>
            <option value="partial-harvest">Partial Harvest</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Any additional context..."
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          />
        </div>
      </div>
    </Modal>
  )
}
