import { useState } from 'react'
import {
  Package01Icon,
  Add01Icon,
  Alert02Icon,
  CheckmarkCircle01Icon,
  Archive01Icon,
  Download04Icon,
  FilterIcon,
  Search01Icon,
  Calendar01Icon,
  MoreHorizontalIcon,
} from 'hugeicons-react'
import Pagination from '../components/UI/Pagination'
import { inventoryItems } from '../data/mockData'

type CategoryFilter = 'all' | 'fish-feed' | 'packaging' | 'processed-fish' | 'vegetables' | 'farm-inputs'

const statusStyles: Record<string, string> = {
  adequate: 'bg-green-50 text-green-700',
  low: 'bg-amber-50 text-amber-700',
  critical: 'bg-red-50 text-red-700',
}

const categoryLabel = (cat: string) => {
  switch (cat) {
    case 'fish-feed': return 'Fish Feed'
    case 'packaging': return 'Packaging'
    case 'processed-fish': return 'Processed Fish'
    case 'vegetables': return 'Vegetables'
    case 'farm-inputs': return 'Farm Inputs'
    default: return cat
  }
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
}

function KpiCard({ title, value, subtext, trend, trendPositive, icon: Icon, color }: {
  title: string; value: string | number; subtext: string; trend?: string; trendPositive?: boolean;
  icon: typeof Package01Icon; color: 'blue' | 'green' | 'amber' | 'red'
}) {
  const colors = colorMap[color]
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-[28px] font-bold text-gray-900 mt-1 leading-tight">{value}</p>
          <p className="text-xs text-gray-500 mt-1.5">{subtext}</p>
          {trend && (
            <p className={`text-xs font-medium mt-2 ${trendPositive ? 'text-green-600' : trendPositive === false ? 'text-red-600' : 'text-gray-500'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
      </div>
    </div>
  )
}

export default function Inventory() {
  const [filter, setFilter] = useState<CategoryFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

  const filteredItems = filter === 'all'
    ? inventoryItems
    : inventoryItems.filter(i => i.category === filter)

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const totalItems = inventoryItems.length
  const lowStockCount = inventoryItems.filter(i => i.status === 'low').length
  const adequateCount = inventoryItems.filter(i => i.status === 'adequate').length
  const criticalCount = inventoryItems.filter(i => i.status === 'critical').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor fish feed, packaging materials, processed stock, vegetables and farm inputs.
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
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm">
            <Add01Icon className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Items"
          value={totalItems}
          subtext="Tracked inventory items"
          trend="5 categories monitored"
          icon={Archive01Icon}
          color="blue"
        />
        <KpiCard
          title="Adequate Stock"
          value={adequateCount}
          subtext="Items above minimum level"
          trend="Stock levels healthy"
          trendPositive={true}
          icon={CheckmarkCircle01Icon}
          color="green"
        />
        <KpiCard
          title="Low Stock"
          value={lowStockCount}
          subtext="Items below minimum level"
          trend="Needs restocking"
          trendPositive={false}
          icon={Alert02Icon}
          color="amber"
        />
        <KpiCard
          title="Critical"
          value={criticalCount}
          subtext="Urgent restock required"
          trend={criticalCount === 0 ? 'No critical items' : 'Action required'}
          trendPositive={criticalCount === 0}
          icon={Package01Icon}
          color="red"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Card Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Stock Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Track current levels, restock dates and stock health across all categories.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search01Icon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Calendar01Icon className="w-4 h-4" />
                <span className="hidden sm:inline">This Month</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-5 py-3 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {(['all', 'fish-feed', 'packaging', 'processed-fish', 'vegetables', 'farm-inputs'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setCurrentPage(1) }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === cat
                    ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All Items' : categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F9FAFB]">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Item</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Stock</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Min Level</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock Health</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Restocked</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map(item => {
                const stockPercent = (item.currentStock / item.minStockLevel) * 100
                const stockBarColor = stockPercent >= 100 ? 'bg-green-500' : stockPercent >= 70 ? 'bg-amber-500' : 'bg-red-500'

                return (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-green-50/30 transition-colors h-[68px]">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">ID: {item.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-700">{categoryLabel(item.category)}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-gray-900">{item.currentStock} {item.unit}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-gray-500">{item.minStockLevel} {item.unit}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${stockBarColor}`}
                            style={{ width: `${Math.min(stockPercent, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{Math.min(stockPercent, 999).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.lastRestocked}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[item.status] || 'bg-gray-100 text-gray-700'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          Restock
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
          <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredItems.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}
