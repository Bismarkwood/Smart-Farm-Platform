import { NavLink } from 'react-router-dom'
import {
  DashboardBrowsingIcon,
  FishFoodIcon,
  Plant01Icon,
  ShoppingCart01Icon,
  Package01Icon,
  ChartIcon,
  Settings01Icon,
  Cancel01Icon,
  Leaf01Icon,
  Logout03Icon,
  CustomerService01Icon,
  SidebarLeftIcon,
} from 'hugeicons-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

interface NavItem {
  to: string
  icon: typeof DashboardBrowsingIcon
  label: string
  badge?: string
  badgeColor?: string
}

const mainItems: NavItem[] = [
  { to: '/', icon: DashboardBrowsingIcon, label: 'Dashboard' },
  { to: '/fish-production', icon: FishFoodIcon, label: 'Fish Production' },
  { to: '/greenhouse', icon: Plant01Icon, label: 'Greenhouse' },
  { to: '/sales', icon: ShoppingCart01Icon, label: 'Sales & Orders', badge: '2', badgeColor: 'bg-amber-500' },
  { to: '/inventory', icon: Package01Icon, label: 'Inventory Management', badge: '4', badgeColor: 'bg-red-500' },
]

const insightItems: NavItem[] = [
  { to: '/reports', icon: ChartIcon, label: 'Reports' },
]

const systemItems: NavItem[] = [
  { to: '/settings', icon: Settings01Icon, label: 'Settings' },
]

function SidebarSection({ label, items, collapsed, onClose }: { label: string; items: NavItem[]; collapsed: boolean; onClose: () => void }) {
  return (
    <div className="mb-2">
      {!collapsed && (
        <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#7DBB8A]">
          {label}
        </p>
      )}
      <div className="space-y-0.5 px-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl transition-all duration-150 ${
                collapsed ? 'justify-center px-2 py-3' : 'px-3.5 py-3'
              } ${
                isActive
                  ? 'bg-[#1F6B34] text-white'
                  : 'text-[#A7D8B1] hover:bg-white/[0.06] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#22C55E] rounded-r-full" />
                )}

                {/* Icon */}
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
                  isActive ? 'bg-white/[0.12]' : 'group-hover:bg-white/[0.06]'
                }`}>
                  <item.icon className="w-[20px] h-[20px]" />
                </span>

                {/* Label */}
                {!collapsed && (
                  <span className="text-[15px] font-medium flex-1">{item.label}</span>
                )}

                {/* Badge */}
                {!collapsed && item.badge && (
                  <span className={`text-[11px] font-semibold text-white px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                    {item.label}
                    {item.badge && (
                      <span className={`ml-1.5 inline-flex items-center justify-center text-[10px] text-white px-1 py-0 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const sidebarWidth = collapsed ? 'w-[76px]' : 'w-[272px]'

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full ${sidebarWidth} bg-[#0B2F18] transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col border-r border-white/[0.08] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className={`flex items-center h-[72px] border-b border-white/[0.08] ${collapsed ? 'justify-center px-2' : 'px-4'}`}>
          {collapsed ? (
            <div className="w-[42px] h-[42px] bg-[#22C55E] rounded-xl flex items-center justify-center shadow-lg shadow-green-900/30">
              <Leaf01Icon className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] bg-[#22C55E] rounded-xl flex items-center justify-center shadow-lg shadow-green-900/30 shrink-0">
                <Leaf01Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-[15px] font-bold text-white leading-tight">Smart Farm</h1>
                <p className="text-[13px] text-green-300/80 leading-tight">Mordecai Farms</p>
                <span className="inline-block mt-1 text-[10px] font-medium text-[#7DBB8A] bg-[#22C55E]/[0.12] px-1.5 py-0.5 rounded">
                  Operations Dashboard
                </span>
              </div>
            </div>
          )}

          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-3 p-1.5 rounded-lg hover:bg-white/10 text-green-300"
          >
            <Cancel01Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 space-y-4">
          <SidebarSection label="Main Operations" items={mainItems} collapsed={collapsed} onClose={onClose} />
          <SidebarSection label="Insights" items={insightItems} collapsed={collapsed} onClose={onClose} />
          <SidebarSection label="System" items={systemItems} collapsed={collapsed} onClose={onClose} />
        </nav>

        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden lg:flex justify-center py-2 border-t border-white/[0.08]">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg text-[#A7D8B1] hover:bg-white/[0.06] hover:text-white transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <SidebarLeftIcon className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Footer */}
        <div className={`border-t border-white/[0.08] ${collapsed ? 'p-2' : 'p-3'}`}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 bg-[#22C55E]/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-300">MF</span>
              </div>
            </div>
          ) : (
            <div className="bg-white/[0.05] rounded-xl p-3 border border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#22C55E]/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-green-300">MF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Mordecai Farms</p>
                  <p className="text-xs text-green-300/70">Farm Manager</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.08]">
                <button className="flex items-center gap-1.5 text-xs text-[#A7D8B1] hover:text-white transition-colors">
                  <CustomerService01Icon className="w-3.5 h-3.5" />
                  Support
                </button>
                <span className="text-white/20">•</span>
                <button className="flex items-center gap-1.5 text-xs text-[#A7D8B1] hover:text-white transition-colors">
                  <Logout03Icon className="w-3.5 h-3.5" />
                  Logout
                </button>
                <span className="ml-auto text-[10px] text-green-300/40">v1.0</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
