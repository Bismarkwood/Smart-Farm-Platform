import { useState } from 'react'
import BatchStatusBadge from './BatchStatusBadge'
import HealthStatusBadge from './HealthStatusBadge'
import SurvivalProgress from './SurvivalProgress'
import BatchActionMenu from './BatchActionMenu'
import Pagination from '../UI/Pagination'
import { fishBatches, ponds } from '../../data/mockData'

interface BatchTableProps {
  onViewBatch: (batchId: string) => void
  onAction: (action: string, batchId: string) => void
}

function getHealthStatus(batch: typeof fishBatches[0]): 'good' | 'watch' | 'critical' {
  const survivalRate = ((batch.currentQuantity) / batch.quantityStocked) * 100
  if (batch.growthStage === 'harvest-ready') return 'good'
  if (survivalRate < 90) return 'critical'
  if (survivalRate < 95) return 'watch'
  return 'good'
}

const ITEMS_PER_PAGE = 5

export default function BatchTable({ onViewBatch, onAction }: BatchTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(fishBatches.length / ITEMS_PER_PAGE)
  const paginatedBatches = fishBatches.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F9FAFB]">
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Batch</th>
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Species</th>
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
              <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stocked</th>
              <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Current</th>
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Survival</th>
              <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mortality</th>
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stage</th>
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Health</th>
              <th className="text-left py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Harvest</th>
              <th className="text-right py-3.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBatches.map(batch => {
              const pond = ponds.find(p => p.id === batch.pondId)
              const survivalRate = (batch.currentQuantity / batch.quantityStocked) * 100
              const mortalityRate = (batch.mortality / batch.quantityStocked) * 100
              const healthStatus = getHealthStatus(batch)
              const speciesName = batch.species.split(' ')[0]
              const speciesBreed = batch.species.includes('(') ? batch.species.match(/\((.+)\)/)?.[1] : undefined

              return (
                <tr key={batch.id} className="border-b border-gray-100 hover:bg-green-50/30 transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <button onClick={() => onViewBatch(batch.id)} className="font-semibold text-gray-900 text-sm hover:text-green-700 transition-colors text-left">
                        {batch.id}
                      </button>
                      <p className="text-xs text-gray-400 mt-0.5">Stocked {batch.stockDate}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <p className="font-medium text-gray-900">{speciesName}</p>
                      {speciesBreed && <p className="text-xs text-gray-400">{speciesBreed}</p>}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <p className="font-medium text-gray-900">{pond?.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{pond?.type} • {pond?.status}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right text-gray-700">{batch.quantityStocked.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-bold text-gray-900">{batch.currentQuantity.toLocaleString()}</td>
                  <td className="py-3 px-3"><SurvivalProgress percentage={survivalRate} /></td>
                  <td className="py-3 px-3 text-right">
                    <div>
                      <p className={`font-medium ${mortalityRate > 5 ? 'text-red-600' : 'text-gray-700'}`}>{batch.mortality}</p>
                      <p className="text-xs text-gray-400">{mortalityRate.toFixed(1)}%</p>
                    </div>
                  </td>
                  <td className="py-3 px-3"><BatchStatusBadge stage={batch.growthStage} /></td>
                  <td className="py-3 px-3"><HealthStatusBadge status={healthStatus} /></td>
                  <td className="py-3 px-3 text-gray-700 text-sm">{batch.expectedHarvestDate}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onViewBatch(batch.id)} className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        View
                      </button>
                      <BatchActionMenu batchId={batch.id} onAction={onAction} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={fishBatches.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  )
}
