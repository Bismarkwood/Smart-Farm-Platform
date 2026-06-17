import { useState } from 'react'
import {
  FishFoodIcon,
  Add01Icon,
  WaterPumpIcon,
  Alert02Icon,
  ChartIncreaseIcon,
  Download04Icon,
  FilterIcon,
  Search01Icon,
  Calendar01Icon,
} from 'hugeicons-react'
import ProductionKpiCard from '../components/FishProduction/ProductionKpiCard'
import BatchTable from '../components/FishProduction/BatchTable'
import PondsGrid from '../components/FishProduction/PondsGrid'
import FeedingRecordsTab from '../components/FishProduction/FeedingRecordsTab'
import HealthLogsTab from '../components/FishProduction/HealthLogsTab'
import NewBatchModal from '../components/FishProduction/NewBatchModal'
import BatchDetailDrawer from '../components/FishProduction/BatchDetailDrawer'
import UpdateStockModal from '../components/FishProduction/UpdateStockModal'
import RecordMortalityModal from '../components/FishProduction/RecordMortalityModal'
import AddFeedingModal from '../components/FishProduction/AddFeedingModal'
import MovePondModal from '../components/FishProduction/MovePondModal'
import MarkHarvestedModal from '../components/FishProduction/MarkHarvestedModal'
import DownloadReportModal from '../components/FishProduction/DownloadReportModal'
import { fishBatches, ponds } from '../data/mockData'

type TabId = 'batches' | 'ponds' | 'feeding' | 'health'
type ModalType = 'none' | 'new-batch' | 'view' | 'update' | 'mortality' | 'feed' | 'move' | 'harvest' | 'download'

const tabs: { id: TabId; label: string }[] = [
  { id: 'batches', label: 'Batches' },
  { id: 'ponds', label: 'Ponds / Tanks' },
  { id: 'feeding', label: 'Feeding Records' },
  { id: 'health', label: 'Health Logs' },
]

export default function FishProduction() {
  const [activeTab, setActiveTab] = useState<TabId>('batches')
  const [activeModal, setActiveModal] = useState<ModalType>('none')
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null)

  const totalFish = fishBatches.reduce((sum, b) => sum + b.currentQuantity, 0)
  const totalMortality = fishBatches.reduce((sum, b) => sum + b.mortality, 0)
  const totalStocked = fishBatches.reduce((sum, b) => sum + b.quantityStocked, 0)
  const mortalityRate = ((totalMortality / totalStocked) * 100).toFixed(1)
  const activePonds = ponds.filter(p => p.status === 'active').length
  const harvestReadyBatches = fishBatches.filter(b => b.growthStage === 'harvest-ready')
  const nextHarvest = harvestReadyBatches[0]

  const openModal = (modal: ModalType, batchId?: string) => {
    if (batchId) setSelectedBatchId(batchId)
    setActiveModal(modal)
  }

  const closeModal = () => {
    setActiveModal('none')
    setSelectedBatchId(null)
  }

  const handleBatchAction = (action: string, batchId: string) => {
    setSelectedBatchId(batchId)
    switch (action) {
      case 'view': setActiveModal('view'); break
      case 'update': setActiveModal('update'); break
      case 'mortality': setActiveModal('mortality'); break
      case 'feed': setActiveModal('feed'); break
      case 'move': setActiveModal('move'); break
      case 'harvest': setActiveModal('harvest'); break
      case 'download': setActiveModal('download'); break
    }
  }

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fish Production</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track fish stock, pond performance, feeding activity, mortality and harvest readiness.
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
          <button
            onClick={() => openModal('new-batch')}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Add01Icon className="w-4 h-4" />
            New Batch
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProductionKpiCard title="Total Fish Stock" value={totalFish.toLocaleString()} subtext={`Across ${fishBatches.filter(b => b.status === 'active').length} active batches`} trend="+8.4% from last month" trendPositive={true} icon={FishFoodIcon} color="blue" />
        <ProductionKpiCard title="Active Ponds / Tanks" value={`${activePonds} / ${ponds.length}`} subtext={`${ponds.length - activePonds} ponds currently inactive`} trend={`${((activePonds / ponds.length) * 100).toFixed(0)}% utilization`} icon={WaterPumpIcon} color="green" />
        <ProductionKpiCard title="Mortality Rate" value={`${mortalityRate}%`} subtext={`${totalMortality} losses recorded`} trend="Within acceptable range" icon={Alert02Icon} color="red" />
        <ProductionKpiCard title="Harvest Ready" value={`${harvestReadyBatches.length} Batch`} subtext={nextHarvest ? `${nextHarvest.species.split(' ')[0]} batch ready this week` : 'No batches ready'} trend={nextHarvest ? `Next harvest: ${nextHarvest.expectedHarvestDate}` : undefined} icon={ChartIncreaseIcon} color="amber" />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Production Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Monitor batch performance, pond activity and feeding progress.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search01Icon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search batches..." className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none" />
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
          {activeTab === 'batches' && <BatchTable onViewBatch={(id) => openModal('view', id)} onAction={handleBatchAction} />}
          {activeTab === 'ponds' && <PondsGrid />}
          {activeTab === 'feeding' && <FeedingRecordsTab />}
          {activeTab === 'health' && <HealthLogsTab />}
        </div>
      </div>

      {/* Modals */}
      <NewBatchModal isOpen={activeModal === 'new-batch'} onClose={closeModal} />
      <BatchDetailDrawer isOpen={activeModal === 'view'} onClose={closeModal} batchId={selectedBatchId} />
      <UpdateStockModal isOpen={activeModal === 'update'} onClose={closeModal} batchId={selectedBatchId} />
      <RecordMortalityModal isOpen={activeModal === 'mortality'} onClose={closeModal} batchId={selectedBatchId} />
      <AddFeedingModal isOpen={activeModal === 'feed'} onClose={closeModal} batchId={selectedBatchId} />
      <MovePondModal isOpen={activeModal === 'move'} onClose={closeModal} batchId={selectedBatchId} />
      <MarkHarvestedModal isOpen={activeModal === 'harvest'} onClose={closeModal} batchId={selectedBatchId} />
      <DownloadReportModal isOpen={activeModal === 'download'} onClose={closeModal} batchId={selectedBatchId} />
    </div>
  )
}
