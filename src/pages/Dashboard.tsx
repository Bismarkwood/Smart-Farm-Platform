import {
  FishFoodIcon,
  ShoppingCart01Icon,
  Package01Icon,
  Alert02Icon,
  ChartIncreaseIcon,
  Calendar01Icon,
  Activity01Icon,
} from 'hugeicons-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import StatCard from '../components/UI/StatCard'
import StatusBadge from '../components/UI/StatusBadge'
import { dashboardSummary, orders, fishBatches, inventoryItems } from '../data/mockData'

const revenueData = [
  { month: 'Jan', revenue: 22000 },
  { month: 'Feb', revenue: 28000 },
  { month: 'Mar', revenue: 25000 },
  { month: 'Apr', revenue: 30000 },
  { month: 'May', revenue: 27000 },
  { month: 'Jun', revenue: 31760 },
]

const productionData = [
  { month: 'Jan', fish: 3200, vegetables: 450 },
  { month: 'Feb', fish: 3800, vegetables: 520 },
  { month: 'Mar', fish: 3500, vegetables: 600 },
  { month: 'Apr', fish: 4100, vegetables: 480 },
  { month: 'May', fish: 3900, vegetables: 550 },
  { month: 'Jun', fish: 4200, vegetables: 620 },
]

const stockDistribution = [
  { name: 'Catfish', value: 11670, color: '#16a34a' },
  { name: 'Tilapia', value: 1750, color: '#0ea5e9' },
]

export default function Dashboard() {
  const lowStockItems = inventoryItems.filter(i => i.status === 'low' || i.status === 'critical')
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed')

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor your farm operations at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Fish Stock"
          value={dashboardSummary.totalFishStock.toLocaleString()}
          icon={FishFoodIcon}
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value={`GH₵ ${dashboardSummary.monthlyRevenue.toLocaleString()}`}
          icon={ChartIncreaseIcon}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Orders"
          value={dashboardSummary.pendingOrders}
          icon={ShoppingCart01Icon}
          color="amber"
        />
        <StatCard
          title="Low Stock Items"
          value={dashboardSummary.lowStockItems}
          icon={Alert02Icon}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Revenue (GH₵)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Production Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Production Output (kg)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="fish" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} name="Fish (kg)" />
              <Line type="monotone" dataKey="vegetables" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} name="Vegetables (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fish Stock Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Fish Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={stockDistribution}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stockDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Harvests */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar01Icon className="w-4 h-4" />
            Upcoming Harvests
          </h3>
          <div className="space-y-3">
            {fishBatches
              .filter(b => b.status === 'active')
              .sort((a, b) => new Date(a.expectedHarvestDate).getTime() - new Date(b.expectedHarvestDate).getTime())
              .slice(0, 4)
              .map(batch => (
                <div key={batch.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{batch.species}</p>
                    <p className="text-xs text-gray-500">{batch.currentQuantity.toLocaleString()} fish</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{batch.expectedHarvestDate}</p>
                    <StatusBadge
                      status={batch.growthStage}
                      variant={batch.growthStage === 'harvest-ready' ? 'success' : 'info'}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity01Icon className="w-4 h-4" />
            Alerts & Notifications
          </h3>
          <div className="space-y-3">
            {lowStockItems.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-start gap-3 p-2 bg-amber-50 rounded-lg">
                <Package01Icon className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-800">{item.name}</p>
                  <p className="text-xs text-amber-600">
                    Stock: {item.currentStock} {item.unit} (Min: {item.minStockLevel})
                  </p>
                </div>
              </div>
            ))}
            {pendingOrders.slice(0, 2).map(order => (
              <div key={order.id} className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
                <ShoppingCart01Icon className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-blue-800">{order.customerName}</p>
                  <p className="text-xs text-blue-600">
                    Order {order.id} - GH₵ {order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
