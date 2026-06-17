import { Cancel01Icon } from 'hugeicons-react'
import { type ComponentType } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  icon?: ComponentType<{ className?: string }>
  iconBg?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'md' | 'lg' | 'xl'
}

const sizeMap = {
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export default function Modal({ isOpen, onClose, title, subtitle, icon: Icon, iconBg = 'bg-green-50', children, footer, size = 'lg' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full ${sizeMap[size]} bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh] animate-modal-in`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Cancel01Icon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 rounded-b-2xl shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
