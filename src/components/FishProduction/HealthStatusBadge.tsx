interface HealthStatusBadgeProps {
  status: 'good' | 'watch' | 'critical'
}

const statusStyles = {
  good: 'bg-green-50 text-green-700',
  watch: 'bg-amber-50 text-amber-700',
  critical: 'bg-red-50 text-red-700',
}

const statusLabels = {
  good: 'Good',
  watch: 'Watch',
  critical: 'Critical',
}

export default function HealthStatusBadge({ status }: HealthStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'good' ? 'bg-green-500' : status === 'watch' ? 'bg-amber-500' : 'bg-red-500'
      }`} />
      {statusLabels[status]}
    </span>
  )
}
