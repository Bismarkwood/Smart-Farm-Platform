interface SurvivalProgressProps {
  percentage: number
}

export default function SurvivalProgress({ percentage }: SurvivalProgressProps) {
  const getColor = () => {
    if (percentage >= 95) return 'bg-green-500'
    if (percentage >= 90) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getTextColor = () => {
    if (percentage >= 95) return 'text-green-700'
    if (percentage >= 90) return 'text-amber-700'
    return 'text-red-700'
  }

  return (
    <div className="flex flex-col gap-1">
      <span className={`text-sm font-semibold ${getTextColor()}`}>
        {percentage.toFixed(1)}%
      </span>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}
