import { useState } from 'react'
import {
  Add01Icon,
  Dollar01Icon,
  UserGroupIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  Download04Icon,
  FilterIcon,
  Search01Icon,
  Calendar01Icon,
  MoreHorizontalIcon,
} from 'hugeicons-react'
import Pagination from '../components/UI/Pagination'
import { orders, customers } from '../data/mockData'

type TabId = 'orders' | 'customers'

const tabs: { id: TabId; label: string }[] = [
  { id: 'orders', label: 'Orders' },
  { id: 'customers', label: 'Customers' },
]

const orderStatusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-blue-50 text-blue-700',
  fulfilled: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}

const paymentStatusStyles: Record<string, string> = {
  paid: 'bg-green-50 text-green-700',
  partial: 'bg-amber-50 text-amber-700',
  unpaid: 'bg-red-50 text-red-700',
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
}

function KpiCard({ title, value, subtext, trend, trendPositive, icon: Icon, color }: {
  title: string; value: string | number; subtext: string; trend?: string; trendPositive?: boolean;
  icon: typeof Dollar01Icon; color: 'blue' | 'green' | 'amber' | 'purple'
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

export default function Sales() {
  const [activeTab, setActiveTab] = useState<TabId>('orders')
  const [orderPage, setOrderPage] = useState(1)
  const [customerPage, setCustomerPage] = useState(1)

  const ITEMS_PER_PAGE = 5
  const totalRevenue = orders.filter(o => o.status === 'fulfilled').reduce((sum, o) => sum + o.totalAmount, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const fulfilledOrders = orders.filter(o => o.status === 'fulfilled').length
  const totalPending = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').reduce((sum, o) => sum + o.totalAmount, 0)

  const orderPages = Math.ceil(orders.length / ITEMS_PER_PAGE)
  const paginatedOrders = orders.slice((orderPage - 1) * ITEMS_PER_PAGE, orderPage * ITEMS_PER_PAGE)
  const customerPages = Math.ceil(customers.length / ITEMS_PER_PAGE)
  const paginatedCustomers = customers.slice((customerPage - 1) * ITEMS_PER_PAGE, customerPage * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900">Sales & Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer orders for live catfish, oven-dried catfish, and vegetables.
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
            New Order
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Revenue"
          value={`GH₵ ${totalRevenue.toLocaleString()}`}
          subtext="From fulfilled orders"
          trend="+12% from last month"
          trendPositive={true}
          icon={Dollar01Icon}
          color="green"
        />
        <KpiCard
          title="Pending Orders"
          value={pendingOrders}
          subtext={`GH₵ ${totalPending.toLocaleString()} pending value`}
          trend="Awaiting processing"
          icon={Clock01Icon}
          color="amber"
        />
        <KpiCard
          title="Fulfilled Orders"
          value={fulfilledOrders}
          subtext="Completed this period"
          trend="100% delivery rate"
          trendPositive={true}
          icon={CheckmarkCircle01Icon}
          color="blue"
        />
        <KpiCard
          title="Total Customers"
          value={customers.length}
          subtext="Active customer accounts"
          trend="+1 new this month"
          trendPositive={true}
          icon={UserGroupIcon}
          color="purple"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Card Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Order Management</h2>
              <p className="text-xs text-gray-500 mt-0.5">Track orders, payments, fulfillment status and customer activity.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search01Icon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders..."
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

        {/* Tabs */}
        <div className="px-5 border-b border-gray-100">
          <nav className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-green-700 bg-green-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === 'orders' && (
            <div>
              <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Order</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Products</th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount (GH₵)</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Payment</th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-green-50/30 transition-colors h-[68px]">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-gray-900 hover:text-green-700 cursor-pointer">{order.id}</p>
                          <p className="text-xs text-gray-400">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-xs text-gray-400">{customers.find(c => c.id === order.customerId)?.location}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{order.orderDate}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-[180px]">
                          <p className="text-gray-700 truncate">{order.items.map(i => i.productName).join(', ')}</p>
                          <p className="text-xs text-gray-400">{order.items.reduce((sum, i) => sum + i.quantity, 0)} {order.items[0]?.unit} total</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-bold text-gray-900">{order.totalAmount.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${orderStatusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${paymentStatusStyles[order.paymentStatus]}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            View
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreHorizontalIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={orderPage} totalPages={orderPages} totalItems={orders.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setOrderPage} />
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9FAFB]">
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Orders</th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Spent (GH₵)</th>
                    <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map(customer => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-green-50/30 transition-colors h-[68px]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-green-700">
                              {customer.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{customer.name}</p>
                            <p className="text-xs text-gray-400">ID: {customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-gray-700">{customer.phone}</p>
                          {customer.email && <p className="text-xs text-gray-400">{customer.email}</p>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{customer.location}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">{customer.totalOrders}</td>
                      <td className="py-3 px-4 text-right font-bold text-gray-900">{customer.totalSpent.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            View
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreHorizontalIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={customerPage} totalPages={customerPages} totalItems={customers.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCustomerPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
