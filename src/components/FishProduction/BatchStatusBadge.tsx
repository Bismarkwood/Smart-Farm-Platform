interface BatchStatusBadgeProps {
  stage: 'fingerling' | 'juvenile' | 'grow-out' | 'harvest-ready'
}

const stageStyles = {
  fingerling: 'bg-gray-100 text-gray-700',
  juvenile: 'bg-amber-50 text-amber-700',
  'grow-out': 'bg-blue-50 text-blue-700',
  'harvest-ready': 'bg-green-50 text-green-700',
}

const stageLabels = {
  fingerling: 'Fingerling',
  juvenile: 'Juvenile',
  'grow-out': 'Grow-Out',
  'harvest-ready': 'Harvest-Ready',
}

export default function BatchStatusBadge({ stage }: BatchStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${stageStyles[stage]}`}>
      {stageLabels[stage]}
    </span>
  )
}
