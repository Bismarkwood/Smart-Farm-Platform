import { Menu01Icon, Notification03Icon, UserIcon, Search01Icon } from 'hugeicons-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu01Icon className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search01Icon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search across modules..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Notification03Icon className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-green-700" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}
