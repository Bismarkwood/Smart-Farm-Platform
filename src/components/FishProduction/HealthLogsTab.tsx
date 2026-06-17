import HealthStatusBadge from './HealthStatusBadge'

interface HealthLog {
  id: string
  date: string
  batchId: string
  pondName: string
  issueType: string
  mortality: number
  observation: string
  actionTaken: string
  staff: string
  status: 'good' | 'watch' | 'critical'
}

const healthLogs: HealthLog[] = [
  {
    id: 'HL001',
    date: '2026-06-17',
    batchId: 'FB001',
    pondName: 'Pond A1',
    issueType: 'Routine Inspection',
    mortality: 0,
    observation: 'Fish feeding actively, no visible abnormalities',
    actionTaken: 'None required',
    staff: 'Kwame A.',
    status: 'good',
  },
  {
    id: 'HL002',
    date: '2026-06-16',
    batchId: 'FB004',
    pondName: 'Pond C1',
    issueType: 'Feed Rejection',
    mortality: 12,
    observation: 'Reduced appetite observed in morning feeding',
    actionTaken: 'Water quality test scheduled, feed quantity reduced',
    staff: 'Ama B.',
    status: 'watch',
  },
  {
    id: 'HL003',
    date: '2026-06-15',
    batchId: 'FB002',
    pondName: 'Pond A2',
    issueType: 'Poor Water Quality',
    mortality: 5,
    observation: 'Slightly elevated ammonia levels detected',
    actionTaken: 'Partial water exchange completed, aeration increased',
    staff: 'Kofi D.',
    status: 'watch',
  },
  {
    id: 'HL004',
    date: '2026-06-14',
    batchId: 'FB003',
    pondName: 'Tank B1',
    issueType: 'Routine Inspection',
    mortality: 0,
    observation: 'Harvest-ready batch, fish healthy and active',
    actionTaken: 'Harvest preparation started',
    staff: 'Kwame A.',
    status: 'good',
  },
]

export default function HealthLogsTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F9FAFB]">
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Batch</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pond / Tank</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Issue Type</th>
            <th className="text-right py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mortality</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Observation</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action Taken</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Staff</th>
            <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody>
          {healthLogs.map(log => (
            <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-gray-700">{log.date}</td>
              <td className="py-3 px-4 font-medium text-gray-900">{log.batchId}</td>
              <td className="py-3 px-4 text-gray-700">{log.pondName}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  log.issueType === 'Routine Inspection' ? 'bg-blue-50 text-blue-700' :
                  log.issueType === 'Feed Rejection' ? 'bg-amber-50 text-amber-700' :
                  log.issueType === 'Poor Water Quality' ? 'bg-red-50 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {log.issueType}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className={log.mortality > 0 ? 'text-red-600 font-medium' : 'text-gray-500'}>
                  {log.mortality}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-700 max-w-[200px] truncate">{log.observation}</td>
              <td className="py-3 px-4 text-gray-700 max-w-[200px] truncate">{log.actionTaken}</td>
              <td className="py-3 px-4 text-gray-700">{log.staff}</td>
              <td className="py-3 px-4">
                <HealthStatusBadge status={log.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
