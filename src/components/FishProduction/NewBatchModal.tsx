import { Cancel01Icon, FishFoodIcon } from 'hugeicons-react'
import { useState } from 'react'
import { ponds } from '../../data/mockData'

interface NewBatchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewBatchModal({ isOpen, onClose }: NewBatchModalProps) {
  const [formData, setFormData] = useState({
    species: '',
    breed: '',
    pondId: '',
    quantity: '',
    avgWeight: '',
    stockDate: '',
    expectedHarvestDate: '',
    supplier: '',
    notes: '',
  })

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would save to backend
    onClose()
  }

  const availablePonds = ponds.filter(p => p.status === 'empty' || p.status === 'active')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end">
      {/* Backdrop — white glass transparent */}
      <div
        className="absolute inset-0 bg-white/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative h-full w-full max-w-[520px] bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <FishFoodIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">New Fish Batch</h2>
              <p className="text-xs text-gray-500">Record a new production batch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Cancel01Icon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {/* Species & Breed */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Species *</label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none"
                >
                  <option value="">Select species</option>
                  <option value="catfish">Catfish</option>
                  <option value="tilapia">Tilapia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Breed / Variety</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="e.g. Clarias"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Pond / Tank */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pond / Tank *</label>
              <select
                name="pondId"
                value={formData.pondId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none"
              >
                <option value="">Select pond or tank</option>
                {availablePonds.map(pond => (
                  <option key={pond.id} value={pond.id}>
                    {pond.name} ({pond.type} — Capacity: {pond.capacity.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Stocked Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 4500"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Avg. Weight (g)</label>
                <input
                  type="number"
                  name="avgWeight"
                  value={formData.avgWeight}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Stocking Date *</label>
                <input
                  type="date"
                  name="stockDate"
                  value={formData.stockDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Harvest *</label>
                <input
                  type="date"
                  name="expectedHarvestDate"
                  value={formData.expectedHarvestDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="e.g. Accra Fish Hatchery"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any additional details about this batch..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
          >
            Save Batch
          </button>
        </div>
      </div>
    </div>
  )
}
