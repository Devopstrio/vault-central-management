import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Lock, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Settings,
  LayoutDashboard,
  Key,
  ShieldCheck,
  RefreshCw,
  History,
  Activity,
  Database,
  Users,
  ChevronRight,
  TrendingUp,
  Globe,
  FileText
} from 'lucide-react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Vault Overview', path: '/', icon: LayoutDashboard },
    { name: 'Secret Explorer', path: '/secrets', icon: Key },
    { name: 'Access Policies', path: '/policies', icon: ShieldCheck },
    { name: 'Rotation Engine', path: '/rotation', icon: RefreshCw },
    { name: 'Identity Sync', path: '/identity', icon: Users },
    { name: 'Secret Leases', path: '/leases', icon: History },
    { name: 'Audit Logs', path: '/audit', icon: FileText },
    { name: 'System Metrics', path: '/metrics', icon: Activity },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center gap-4 border-b border-zinc-800">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-600/20">
            <Lock className="text-white w-5 h-5" />
          </div>
          {sidebarOpen && <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">CENTRAL-VAULT</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-amber-600/10 text-amber-400 border border-amber-600/20' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-2 bg-zinc-800/50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              SA
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Security Admin</p>
                <p className="text-xs text-zinc-500 truncate">Root Namespace</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search secrets, policies, or audit trails..." 
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              ROTATION ENGINE: ACTIVE
            </div>
            <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
