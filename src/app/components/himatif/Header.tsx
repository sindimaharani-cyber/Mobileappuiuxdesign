import { Bell, Menu, LogOut } from 'lucide-react';
import { User } from '@/types';
import { Avatar } from '@/app/components/ui/avatar';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  onLogout: () => void;
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin': return 'Admin/Ketua';
    case 'bendahara': return 'Bendahara';
    case 'ketua_divisi': return 'Ketua Divisi';
    case 'anggota': return 'Anggota';
    case 'prodi': return 'Prodi';
    default: return role;
  }
};

export function Header({ user, onMenuClick, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0A1D37] border-b border-white/10 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="font-semibold text-white">HIMATIF UIR</h1>
            <p className="text-xs text-white/70">{getRoleLabel(user.role)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FBC02D] rounded-full"></span>
          </button>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Keluar"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
          <Avatar className="w-9 h-9 bg-[#1565C0] text-white flex items-center justify-center font-semibold">
            {user.name.charAt(0)}
          </Avatar>
        </div>
      </div>
    </header>
  );
}
