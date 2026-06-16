import {
  Home, Megaphone, Calendar, Users, Wallet, ClipboardList, BarChart3, X,
  Bell, MessageSquare, CalendarCheck, QrCode, Award, Network, UserPlus,
  FolderOpen, Mail, Trello, ChevronRight
} from 'lucide-react';
import { UserRole } from '@/types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userRole: UserRole;
  userDivision?: string;
}

const SECTIONS = [
  {
    label: 'Utama',
    items: [
      { id: 'dashboard', icon: Home, label: 'Dashboard', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'announcements', icon: Megaphone, label: 'Pengumuman', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'notifications', icon: Bell, label: 'Notifikasi', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'forum', icon: MessageSquare, label: 'Forum Diskusi', roles: ['admin','bendahara','ketua_divisi','anggota'] },
    ]
  },
  {
    label: 'Kegiatan',
    items: [
      { id: 'activities', icon: Calendar, label: 'Kegiatan', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'calendar', icon: CalendarCheck, label: 'Kalender', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'registration', icon: QrCode, label: 'Pendaftaran & Absensi', roles: ['admin','bendahara','ketua_divisi','anggota'] },
      { id: 'certificates', icon: Award, label: 'Sertifikat Digital', roles: ['admin','bendahara','ketua_divisi','anggota'] },
    ]
  },
  {
    label: 'Organisasi',
    items: [
      { id: 'members', icon: Users, label: 'Data Anggota', roles: ['admin','prodi'] },
      { id: 'organization', icon: Network, label: 'Struktur Organisasi', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'recruitment', icon: UserPlus, label: 'Rekrutmen', roles: ['admin','anggota'] },
    ]
  },
  {
    label: 'Administrasi',
    items: [
      { id: 'finance', icon: Wallet, label: 'Keuangan', roles: ['admin','bendahara','ketua_divisi','anggota','prodi'] },
      { id: 'jobdesk', icon: ClipboardList, label: 'Jobdesk Divisi', roles: ['admin','ketua_divisi','anggota','prodi'] },
      { id: 'sprint', icon: Trello, label: 'SCRUM Sprint Board', roles: ['admin','ketua_divisi','anggota'] },
      { id: 'documentation', icon: FolderOpen, label: 'Dokumentasi & Arsip', roles: ['admin','ketua_divisi','anggota','prodi'] },
      { id: 'letters', icon: Mail, label: 'Manajemen Surat', roles: ['admin'] },
    ]
  },
  {
    label: 'Monitoring',
    items: [
      { id: 'monitoring', icon: BarChart3, label: 'Monitoring Prodi', roles: ['prodi'] },
    ]
  },
];

const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin / Ketua HIMATIF',
  bendahara: 'Bendahara',
  ketua_divisi: 'Ketua Divisi',
  anggota: 'Anggota',
  prodi: 'Program Studi',
};

const ROLE_COLORS: Record<string, string> = {
  admin: '#FBC02D', bendahara: '#A78BFA', ketua_divisi: '#34D399', anggota: '#60A5FA', prodi: '#F87171',
};

export function NavigationDrawer({ isOpen, onClose, activeTab, onTabChange, userName, userRole, userDivision }: NavigationDrawerProps) {
  const handleItemClick = (id: string) => { onTabChange(id); onClose(); };
  const roleColor = ROLE_COLORS[userRole] || '#FBC02D';

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />}

      <div className="fixed top-0 left-0 h-full z-50 w-72 flex flex-col overflow-hidden transition-transform duration-300"
        style={{ background: '#0A1D37', transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Header */}
        <div className="p-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1565C0,#0A1D37)', border: '1px solid rgba(251,192,45,0.3)' }}>
                <span style={{ color: '#FBC02D', fontSize: '10px', fontWeight: 800 }}>H</span>
              </div>
              <p style={{ color: '#E8EDF5', fontWeight: 700, fontSize: '13px' }}>E-ORGANISASI</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <X size={16} className="text-white/70" />
            </button>
          </div>

          {/* User card */}
          <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(21,101,192,0.15)', border: '1px solid rgba(21,101,192,0.25)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0" style={{ background: roleColor, color: '#0A1D37', fontSize: '15px' }}>
              {userName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white truncate" style={{ fontSize: '13px' }}>{userName}</p>
              <p style={{ fontSize: '11px', color: roleColor }}>{ROLE_LABELS[userRole]}</p>
              {userDivision && <p style={{ fontSize: '10px', color: '#8899AA' }}>{userDivision}</p>}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3" style={{ scrollbarWidth: 'none' }}>
          {SECTIONS.map(section => {
            const visible = section.items.filter(i => (i.roles as string[]).includes(userRole));
            if (!visible.length) return null;
            return (
              <div key={section.label} className="mb-4">
                <p style={{ color: '#8899AA', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', padding: '0 8px', marginBottom: '4px' }}>
                  {section.label.toUpperCase()}
                </p>
                <div className="space-y-0.5">
                  {visible.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button key={item.id} onClick={() => handleItemClick(item.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                        style={{
                          background: isActive ? 'rgba(251,192,45,0.12)' : 'transparent',
                          border: isActive ? '1px solid rgba(251,192,45,0.25)' : '1px solid transparent',
                          color: isActive ? '#FBC02D' : 'rgba(255,255,255,0.75)',
                        }}>
                        <Icon size={16} />
                        <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 400, flex: 1, textAlign: 'left' }}>{item.label}</span>
                        {isActive && <ChevronRight size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: '#8899AA', fontSize: '10px', textAlign: 'center' }}>HIMATIF UIR · Implementasi Scrum · 2024</p>
        </div>
      </div>
    </>
  );
}