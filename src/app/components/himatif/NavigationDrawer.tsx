import { 
  Home, 
  Megaphone, 
  Calendar, 
  Users, 
  Wallet, 
  ClipboardList,
  BarChart3,
  X,
  GraduationCap,
  Bell,
  MessageSquare,
  CalendarCheck,
  QrCode,
  Award,
  Network,
  UserPlus,
  FolderOpen,
  Mail
} from 'lucide-react';
import { UserRole } from '@/types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userRole: UserRole;
  userPosition?: string;
}

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  roles: UserRole[];
  section?: string;
}

const menuItems: MenuItem[] = [
  // Informasi & Komunikasi
  { id: 'dashboard', icon: Home, label: 'Dashboard', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Informasi & Komunikasi' },
  { id: 'announcements', icon: Megaphone, label: 'Pengumuman', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Informasi & Komunikasi' },
  { id: 'notifications', icon: Bell, label: 'Notifikasi', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Informasi & Komunikasi' },
  { id: 'forum', icon: MessageSquare, label: 'Forum Diskusi', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota'], section: 'Informasi & Komunikasi' },
  
  // Manajemen Kegiatan
  { id: 'activities', icon: Calendar, label: 'Kegiatan', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Manajemen Kegiatan' },
  { id: 'calendar', icon: CalendarCheck, label: 'Kalender', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Manajemen Kegiatan' },
  { id: 'registration', icon: QrCode, label: 'Pendaftaran & Absensi', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota'], section: 'Manajemen Kegiatan' },
  { id: 'certificates', icon: Award, label: 'Sertifikat', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota'], section: 'Manajemen Kegiatan' },
  
  // Keanggotaan & Organisasi
  { id: 'members', icon: Users, label: 'Data Anggota', roles: ['admin', 'prodi'], section: 'Keanggotaan & Organisasi' },
  { id: 'organization', icon: Network, label: 'Struktur Organisasi', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Keanggotaan & Organisasi' },
  { id: 'recruitment', icon: UserPlus, label: 'Rekrutmen', roles: ['admin', 'anggota'], section: 'Keanggotaan & Organisasi' },
  
  // Administrasi & Keuangan
  { id: 'finance', icon: Wallet, label: 'Keuangan', roles: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi'], section: 'Administrasi' },
  { id: 'jobdesk', icon: ClipboardList, label: 'Jobdesk Divisi', roles: ['admin', 'ketua_divisi', 'anggota', 'prodi'], section: 'Administrasi' },
  { id: 'documentation', icon: FolderOpen, label: 'Dokumentasi & Arsip', roles: ['admin', 'ketua_divisi', 'anggota', 'prodi'], section: 'Administrasi' },
  { id: 'letters', icon: Mail, label: 'Manajemen Surat', roles: ['admin'], section: 'Administrasi' },
  
  // Monitoring
  { id: 'monitoring', icon: BarChart3, label: 'Monitoring Prodi', roles: ['prodi'], section: 'Monitoring' },
];

const getRoleLabel = (role: UserRole) => {
  switch (role) {
    case 'admin': return 'Admin/Ketua HIMATIF';
    case 'bendahara': return 'Bendahara';
    case 'ketua_divisi': return 'Ketua Divisi';
    case 'anggota': return 'Anggota';
    case 'prodi': return 'Program Studi';
    default: return role;
  }
};

export function NavigationDrawer({ 
  isOpen, 
  onClose, 
  activeTab, 
  onTabChange,
  userName,
  userRole,
  userPosition
}: NavigationDrawerProps) {
  const handleItemClick = (id: string) => {
    onTabChange(id);
    onClose();
  };

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-[#0A1D37] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1565C0] to-[#FBC02D] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">{userName}</p>
                <p className="text-sm text-white/70">{getRoleLabel(userRole)}</p>
                {userPosition && (
                  <p className="text-xs text-white/50">{userPosition}</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {visibleMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive 
                          ? "bg-[#FBC02D] text-[#0A1D37]" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-xs text-white/50">Universitas Islam Riau</p>
              <p className="text-xs text-white/70 font-medium mt-1">HIMATIF 2026</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}