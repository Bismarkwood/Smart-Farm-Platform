import { useState } from 'react'
import {
  Leaf01Icon,
  Add01Icon,
  Plant01Icon,
  Calendar01Icon,
  BarChartIcon,
  Download04Icon,
  FilterIcon,
  Search01Icon,
  MoreHorizontalIcon,
} from 'hugeicons-react'
import GreenhouseKpiCard from '../components/Greenhouse/GreenhouseKpiCard'
import NewCropBatchModal from '../components/Greenhouse/NewCropBatchModal'
import CropDetailModal from '../components/Greenhouse/CropDetailModal'
import Pagination from '../components/UI/Pagination'
import { cropBatches, greenhouses } from '../data/mockData'

type TabId = 'crops' | 'greenhouses'

const tabs: { id: TabId; label: string }[] = [
  { id: 'crops', label: 'Crop Batches' },
  { id: 'greenhouses', label: 'Greenhouses' },
]

const cropStatusStyles: Record<string, string> = {
  growing: 'bg-blue-50 text-blue-700',
  harvested: 'bg-green-50 text-green-700',
  failed: 'bg-red-50 text-red-700',
}

const ITEMS_PER_PAGE = 5

export default function Greenhouse() {
  const [activeTab, setActiveTab] = useState<TabId>('crops')
  const [showNewCrop, setShowNewCrop] = useState(false)
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null)
  const [showCropDetail, setShowCropDetail] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const activeCrops = cropBatches.filter(c => c.status === 'growing').length
  const totalExpectedYield = cropBatches.filter(c => c.status === 'growing').reduce((sum, c) => sum + c.expectedYieldKg, 0)
  const totalAvailableStock = cropBatches.reduce((sum, c) => sum + c.availableStockKg, 0)
  const harvestedThisMonth = cropBatches.filter(c => c.status === 'harvested' && c.actualHarvestDate?.startsWith('2026-06')).length

  const totalPages = Math.ceil(cropBatches.length / ITEMS_PER_PAGE)
  const paginatedCrops = cropBatches.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleViewCrop = (cropId: string) => {
    setSelectedCropId(cropId)
    setShowCropDetail(true)
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Greenhouse Production</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track crop cycles, planting schedules, expected yields and available vegetable stock.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download04Icon className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <FilterIcon className="w-4 h-4" />
            Filter
          </button>
          <button onClick={() => setShowNewCrop(true)} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            <Add01Icon className="w-4 h-4" />
            New Crop Batch
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GreenhouseKpiCard title="Active Crops" value={activeCrops} subtext={`Across ${greenhouses.filter(g => g.status === 'active').length} greenhouses`} trend="All greenhouses operational" icon={Plant01Icon} color="green" />
        <GreenhouseKpiCard title="Expected Yield" value={`${totalExpectedYield.toLocaleString()} kg`} subtext="From active growing batches" trend="+15% from last cycle" trendPositive={true} icon={BarChartIcon} color="blue" />
        <GreenhouseKpiCard title="Available Stock" value={`${totalAvailableStock} kg`} subtext="Harvested and ready for sale" icon={Leaf01Icon} color="amber" />
        <GreenhouseKpiCard title="Harvested This Month" value={harvestedThisMonth} subtext="Batches completed this period" trend="On schedule" icon={Calendar01Icon} color="purple" />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Crop Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Monitor planting, growth stages, yields and greenhouse utilization.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search01Icon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search crops..." className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Calendar01Icon className="w-4 h-4" />
                <span className="hidden sm:inline">This Month</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 border-b border-gray-100">
          <nav className="flex gap-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors relative ${activeTab === tab.id ? 'text-green-700 bg-green-50/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
                {tab.label}
                {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'crops' && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F9FAFB]">
                      <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Crop</th>
                      <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Greenhouse</th>
                      <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Planted</th>
                      <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Harvest Date</th>
                      <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Expected (kg)</th>
                      <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actual (kg)</th>
                      <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Available (kg)</th>
                      <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCrops.map(crop => {
                      const gh = greenhouses.find(g => g.id === crop.greenhouseId)
                      const yieldPercent = crop.actualYieldKg ? ((crop.actualYieldKg / crop.expectedYieldKg) * 100).toFixed(0) : null

                      return (
                        <tr key={crop.id} className="border-b border-gray-100 hover:bg-green-50/30 transition-colors">
                          <td className="py-3 px-3">
                            <div>
                              <button onClick={() => handleViewCrop(crop.id)} className="font-semibold text-gray-900 hover:text-green-700 transition-colors text-left">
                                {crop.cropType}
                              </button>
                              <p className="text-xs text-gray-400">{crop.variety}</p>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div>
                              <p className="font-medium text-gray-900">{gh?.name}</p>
                              <p className="text-xs text-gray-400">{gh?.sizeSqm} sqm</p>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-gray-700">{crop.plantingDate}</td>
                          <td className="py-3 px-3 text-gray-700">{crop.actualHarvestDate || crop.expectedHarvestDate}</td>
                          <td className="py-3 px-3 text-right text-gray-700">{crop.expectedYieldKg}</td>
                          <td className="py-3 px-3 text-right">
                            {crop.actualYieldKg ? (
                              <div>
                                <p className="font-medium text-gray-900">{crop.actualYieldKg}</p>
                                <p className="text-xs text-gray-400">{yieldPercent}% of target</p>
                              </div>
                            ) : <span className="text-gray-400">—</span>}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className={`font-bold ${crop.availableStockKg > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                              {crop.availableStockKg || '—'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${cropStatusStyles[crop.status] || 'bg-gray-100 text-gray-700'}`}>
                              {crop.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleViewCrop(crop.id)} className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                View
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                                <MoreHorizontalIcon className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={cropBatches.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
            </div>
          )}

          {activeTab === 'greenhouses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {greenhouses.map(gh => {
                const crop = cropBatches.find(c => c.id === gh.currentCropId)
                return (
                  <div key={gh.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${gh.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <h4 className="font-semibold text-gray-900">{gh.name}</h4>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${gh.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {gh.status}
                      </span>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size</span>
                        <span className="text-gray-900 font-medium">{gh.sizeSqm} sqm</span>
                      </div>
                      {crop && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Current Crop</span>
                            <span className="text-gray-900 font-medium">{crop.cropType} ({crop.variety})</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Expected Harvest</span>
                            <span className="text-gray-900 font-medium">{crop.expectedHarvestDate}</span>
                          </div>
                        </>
                      )}
                      {!crop && <p className="text-gray-400 text-xs">No active crop assigned</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <NewCropBatchModal isOpen={showNewCrop} onClose={() => setShowNewCrop(false)} />
      <CropDetailModal isOpen={showCropDetail} onClose={() => { setShowCropDetail(false); setSelectedCropId(null) }} cropId={selectedCropId} />
    </div>
  )
}
