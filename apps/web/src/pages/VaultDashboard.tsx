import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Key, 
  ShieldCheck, 
  RefreshCw, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Lock,
  Database,
  Cpu,
  ChevronRight,
  Zap,
  AlertTriangle,
  History
} from 'lucide-react';

const accessData = [
  { name: 'Mon', granted: 120, denied: 2 },
  { name: 'Tue', granted: 145, denied: 5 },
  { name: 'Wed', granted: 110, denied: 1 },
  { name: 'Thu', granted: 160, denied: 8 },
  { name: 'Fri', granted: 130, denied: 3 },
  { name: 'Sat', granted: 180, denied: 0 },
  { name: 'Sun', granted: 120, denied: 1 },
];

const KPI_CARDS = [
  { title: 'Total Secrets', value: '1,245', trend: '+12', color: 'amber', icon: Key },
  { title: 'Active Leases', value: '428', trend: '+5%', color: 'emerald', icon: History },
  { title: 'Access Requests', value: '2.4K', trend: '+15%', color: 'amber', icon: Activity },
  { title: 'Security Score', value: '98/100', trend: '+2', color: 'emerald', icon: ShieldCheck },
];

const VaultDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Central Vault Control Plane</h1>
          <p className="text-zinc-400">Enterprise-grade secrets orchestration, policy enforcement, and identity governance.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-zinc-700">
            Export Audit Trail
          </button>
          <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-amber-600/20">
            Provision New Secret
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative group hover:border-zinc-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-amber-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-amber-400`} />
              </div>
              <div className={`text-xs font-medium ${card.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-zinc-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Access Activity */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Secret Access Activity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accessData}>
                <defs>
                  <linearGradient id="colorGranted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="granted" stroke="#f59e0b" fill="url(#colorGranted)" name="Access Granted" />
                <Area type="monotone" dataKey="denied" stroke="#ef4444" fill="none" name="Access Denied" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Security Summary */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Vault Health Summary</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'Master Key Status', score: 100, color: 'bg-emerald-500', status: 'UNLOCKED' },
              { label: 'Policy Coverage', score: 94, color: 'bg-amber-500', status: 'HIGH' },
              { label: 'Rotation Compliance', score: 82, color: 'bg-amber-500', status: 'WARN' },
              { label: 'Audit Trail Integrity', score: 100, color: 'bg-emerald-500', status: 'VERIFIED' },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300 font-medium">{node.label}</span>
                  <span className="text-zinc-400">{node.status}</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color}`} style={{ width: `${node.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3">
            <RefreshCw className="text-amber-400 shrink-0" size={18} />
            <p className="text-xs text-zinc-400">Next Scheduled Rotation: <span className="text-amber-400 font-bold">In 2 hours</span>. 14 database credentials will be updated.</p>
          </div>
        </div>
      </div>

      {/* Secret Inventory Grid */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Live Secret Inventory</h3>
          <button className="text-amber-400 hover:text-amber-300 text-sm font-medium">View Global Namespace</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Namespace / Path</th>
                <th className="px-6 py-4 font-semibold">Secret ID</th>
                <th className="px-6 py-4 font-semibold">TTL / Expiry</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[
                { path: 'apps/frontend/api_key', id: 'sec-8a2f1c', ttl: '24h', status: 'ACTIVE', type: 'KV-V2' },
                { path: 'infra/db/master_pass', id: 'sec-3d5e9f', ttl: '1h', status: 'ROTATING', type: 'DYNAMIC' },
                { path: 'security/root/ca_cert', id: 'sec-1b7a2d', ttl: '365d', status: 'ACTIVE', type: 'CERT' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-zinc-200">{row.path}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-zinc-400">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-zinc-300">{row.ttl}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'ACTIVE' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-zinc-500 font-bold tracking-widest">{row.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-amber-400 hover:text-amber-300 text-xs font-bold uppercase tracking-wider">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VaultDashboard;
