import { useState, useRef, useEffect } from 'react'
import { MoreHorizontalIcon } from 'hugeicons-react'

interface BatchActionMenuProps {
  batchId: string
  onAction: (action: string, batchId: string) => void
}

const actions = [
  { label: 'View Details', key: 'view' },
  { label: 'Update Stock', key: 'update' },
  { label: 'Record Mortality', key: 'mortality' },
  { label: 'Add Feeding Record', key: 'feed' },
  { label: 'Move Pond / Tank', key: 'move' },
  { label: 'Mark Harvested', key: 'harvest' },
  { label: 'Download Report', key: 'download' },
]

export default function BatchActionMenu({ batchId, onAction }: BatchActionMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontalIcon className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <>
          {/* Full-screen invisible overlay to catch clicks */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          {/* Dropdown menu */}
          <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-[9999] py-1.5">
            {actions.map((action) => (
              <button
                key={action.key}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                  action.key === 'view' ? 'font-semibold text-gray-900' :
                  action.key === 'harvest' ? 'text-amber-700' :
                  action.key === 'download' ? 'text-blue-700' :
                  'text-gray-700'
                }`}
                onClick={() => {
                  onAction(action.key, batchId)
                  setOpen(false)
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
