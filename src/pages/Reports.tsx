import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts'
import { Download04Icon, FishFoodIcon, Leaf01Icon, ShoppingCart01Icon } from 'hugeicons-react'

const monthlySales = [
  { month: 'Jan', liveCatfish: 12000, driedCatfish: 8000, vegetables: 3200 },
  { month: 'Feb', liveCatfish: 15000, driedCatfish: 6500, vegetables: 4100 },
  { month: 'Mar', liveCatfish: 13500, driedCatfish: 7200, vegetables: 3800 },
  { month: 'Apr', liveCatfish: 18000, driedCatfish: 9000, vegetables: 4500 },
  { month: 'May', liveCatfish: 16000, driedCatfish: 7800, vegetables: 3900 },
  { month: 'Jun', liveCatfish: 19800, driedCatfish: 8000, vegetables: 3960 },
]

const productMix = [
  { name: 'Live Catfish', value: 60, color: '#0ea5e9' },
  { name: 'Oven-Dried Catfish', value: 25, color: '#f59e0b' },
  { name: 'Vegetables', value: 15, color: '#16a34a' },
]

const mortalityTrend = [
  { month: 'Jan', rate: 4.2 },
  { month: 'Feb', rate: 3.8 },
  { month: 'Mar', rate: 4.0 },
  { month: 'Apr', rate: 3.5 },
  { month: 'May', rate: 3.2 },
  { month: 'Jun', rate: 3.5 },
]

const customerActivity = [
  { month: 'Jan', newCustomers: 2, repeatOrders: 8 },
  { month: 'Feb', newCustomers: 1, repeatOrders: 10 },
  { month: 'Mar', newCustomers: 3, repeatOrders: 9 },
  { month: 'Apr', newCustomers: 1, repeatOrders: 12 },
  { month: 'May', newCustomers: 2, repeatOrders: 11 },
  { month: 'Jun', newCustomers: 1, repeatOrders: 13 },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Management Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Production performance, sales, and operational insights</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <Download04Icon className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FishFoodIcon className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Fish Production</span>
          </div>
          <p className="text-xl font-bold text-gray-900">4,200 kg</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Leaf01Icon className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Vegetable Output</span>
          </div>
          <p className="text-xl font-bold text-gray-900">620 kg</p>
          <p className="text-xs text-green-600 mt-1">↑ 13% from last month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg">
              <ShoppingCart01Icon className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Sales Revenue</span>
          </div>
          <p className="text-xl font-bold text-gray-900">GH₵ 31,760</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Product */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Sales by Product (GH₵)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="liveCatfish" name="Live Catfish" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
              <Bar dataKey="driedCatfish" name="Dried Catfish" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="vegetables" name="Vegetables" fill="#16a34a" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Product Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={productMix}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {productMix.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Mortality Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Fish Mortality Rate (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mortalityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 6]} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Mortality %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Activity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={customerActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="newCustomers" name="New Customers" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="repeatOrders" name="Repeat Orders" fill="#06b6d4" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
