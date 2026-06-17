import { type ComponentType } from 'react'

interface GreenhouseKpiCardProps {
  title: string
  value: string | number
  subtext: string
  trend?: string
  trendPositive?: boolean
  icon: ComponentType<{ className?: string }>
  color: 'blue' | 'green' | 'red' | 'amber' | 'purple'
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
}

export default function GreenhouseKpiCard({ title, value, subtext, trend, trendPositive, icon: Icon, color }: GreenhouseKpiCardProps) {
  const colors = colorMap[color]
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 leading-tight">{value}</p>
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
