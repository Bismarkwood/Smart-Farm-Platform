import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Plant01Icon, Cancel01Icon } from 'hugeicons-react'
import { greenhouses } from '../../data/mockData'

interface NewCropBatchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewCropBatchModal({ isOpen, onClose }: NewCropBatchModalProps) {
  const [formData, setFormData] = useState({
    cropType: '',
    variety: '',
    greenhouseId: '',
    plantingDate: '',
    expectedHarvestDate: '',
    expectedYieldKg: '',
    seedSource: '',
    plantingMethod: '',
    notes: '',
  })

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-gray-200 flex flex-col max-h-[90vh] animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Plant01Icon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">New Crop Batch</h2>
              <p className="text-xs text-gray-500">Record a new greenhouse planting</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Cancel01Icon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Crop Type *</label>
                <select name="cropType" value={formData.cropType} onChange={handleChange} required className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select crop</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="peppers">Peppers</option>
                  <option value="lettuce">Lettuce</option>
                  <option value="cucumbers">Cucumbers</option>
                  <option value="spinach">Spinach</option>
                  <option value="cabbage">Cabbage</option>
                  <option value="onions">Onions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Variety</label>
                <input type="text" name="variety" value={formData.variety} onChange={handleChange} placeholder="e.g. Roma, Butterhead" className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Greenhouse *</label>
              <select name="greenhouseId" value={formData.greenhouseId} onChange={handleChange} required className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                <option value="">Select greenhouse</option>
                {greenhouses.map(gh => (
                  <option key={gh.id} value={gh.id}>{gh.name} ({gh.sizeSqm} sqm — {gh.status})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Planting Date *</label>
                <input type="date" name="plantingDate" value={formData.plantingDate} onChange={handleChange} required className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Harvest *</label>
                <input type="date" name="expectedHarvestDate" value={formData.expectedHarvestDate} onChange={handleChange} required className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Yield (kg) *</label>
                <input type="number" name="expectedYieldKg" value={formData.expectedYieldKg} onChange={handleChange} placeholder="e.g. 800" required className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Planting Method</label>
                <select name="plantingMethod" value={formData.plantingMethod} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select method</option>
                  <option value="transplant">Transplant</option>
                  <option value="direct-seeding">Direct Seeding</option>
                  <option value="hydroponics">Hydroponics</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Seed Source / Supplier</label>
              <input type="text" name="seedSource" value={formData.seedSource} onChange={handleChange} placeholder="e.g. Ghana Seed Company" className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Additional details about this crop batch..." className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 rounded-b-2xl shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors">
            Save Crop Batch
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
