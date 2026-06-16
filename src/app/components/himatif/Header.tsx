import { Bell, Menu, LogOut, ShieldCheck } from 'lucide-react';
import { User } from '@/types';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  onLogout: () => void;
  onNotifClick: () => void;
  notifCount?: number;
}

const ROLE_COLORS: Record<string, string> = {
  admin: '#FBC02D',
  bendahara: '#A78BFA',
  ketua_divisi: '#34D399',
  anggota: '#60A5FA',
  prodi: '#F87171',
};

const getRoleLabel = (role: string) => {
  const map: Record<string, string> = {
    admin: 'Admin / Ketua HIMATIF',
    bendahara: 'Bendahara',
    ketua_divisi: 'Ketua Divisi',
    anggota: 'Anggota',
    prodi: 'Program Studi',
  };
  return map[role] || role;
};

export function Header({ user, onMenuClick, onLogout, onNotifClick, notifCount = 3 }: HeaderProps) {
  const roleColor = ROLE_COLORS[user.role] || '#FBC02D';

  return (
    <header className="sticky top-0 z-50 px-4 py-3 shadow-xl" style={{ background: '#0A1D37', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Left: menu + brand */}
        <div className="flex items-center gap-2.5">
          <button onClick={onMenuClick} className="p-2 rounded-xl transition-colors hover:bg-white/10" style={{ marginLeft: '-8px' }}>
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1565C0, #0A1D37)', border: '1px solid rgba(251,192,45,0.3)' }}>
              <ShieldCheck size={14} style={{ color: '#FBC02D' }} />
            </div>
            <div>
              <p className="font-bold text-white" style={{ fontSize: '13px', lineHeight: 1.2 }}>HIMATIF UIR</p>
              <p style={{ fontSize: '10px', color: roleColor, lineHeight: 1.2, fontWeight: 500 }}>{getRoleLabel(user.role)}</p>
            </div>
          </div>
        </div>

        {/* Right: notif + avatar */}
        <div className="flex items-center gap-2">
          <button onClick={onNotifClick} className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5 text-white" />
            {notifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold" style={{ background: '#FBC02D', fontSize: '9px', color: '#0A1D37' }}>
                {notifCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: roleColor, color: '#0A1D37' }}>
              {user.name.charAt(0)}
            </div>
            <button onClick={onLogout} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Keluar">
              <LogOut size={15} className="text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
