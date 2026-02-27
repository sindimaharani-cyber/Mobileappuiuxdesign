import { Calendar, Users, Wallet, ClipboardList, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { UserRole } from '@/types';
import { mockActivities, mockMembers, mockTransactions, mockJobdesks } from '@/data/mockData';

interface DashboardProps {
  userRole: UserRole;
  userName: string;
}

export function Dashboard({ userRole, userName }: DashboardProps) {
  const totalMembers = mockMembers.filter(m => m.status === 'aktif').length;
  const upcomingActivities = mockActivities.filter(a => a.status === 'perencanaan' || a.status === 'pelaksanaan').length;
  const totalIncome = mockTransactions.filter(t => t.type === 'pemasukan').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = mockTransactions.filter(t => t.type === 'pengeluaran').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const completedJobdesks = mockJobdesks.filter(j => j.status === 'selesai').length;
  const totalJobdesks = mockJobdesks.length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const stats = [
    { 
      icon: Users, 
      label: 'Anggota Aktif', 
      value: totalMembers.toString(), 
      color: 'bg-blue-100 text-[#1565C0]',
      visible: ['admin', 'prodi']
    },
    { 
      icon: Calendar, 
      label: 'Kegiatan Aktif', 
      value: upcomingActivities.toString(), 
      color: 'bg-purple-100 text-purple-600',
      visible: ['admin', 'bendahara', 'ketua_divisi', 'anggota', 'prodi']
    },
    { 
      icon: Wallet, 
      label: 'Saldo Kas', 
      value: `Rp ${(balance / 1000000).toFixed(1)}jt`, 
      color: 'bg-green-100 text-green-600',
      visible: ['admin', 'bendahara', 'prodi']
    },
    { 
      icon: ClipboardList, 
      label: 'Jobdesk Selesai', 
      value: `${completedJobdesks}/${totalJobdesks}`, 
      color: 'bg-yellow-100 text-yellow-600',
      visible: ['admin', 'ketua_divisi', 'prodi']
    },
  ];

  const visibleStats = stats.filter(stat => stat.visible.includes(userRole));

  const recentActivities = mockActivities.slice(0, 3);
  const recentAnnouncements = [
    { title: 'Rapat Koordinasi Pengurus', date: '2 hari lalu', priority: 'high' },
    { title: 'Pendaftaran Seminar Teknologi', date: '3 hari lalu', priority: 'medium' },
    { title: 'Laporan Keuangan Januari', date: '1 minggu lalu', priority: 'low' },
  ];

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      {/* Hero Section */}
      <div className="relative h-44 bg-gradient-to-br from-[#0A1D37] via-[#1565C0] to-[#0A1D37] mx-4 mt-4 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">{getGreeting()}! 👋</h2>
          <p className="opacity-90">{userName}</p>
          <p className="text-sm opacity-75 mt-1">Selamat beraktivitas di HIMATIF UIR</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-6">
        {visibleStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 border-0 shadow-sm bg-white">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-[#0A1D37] mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#0A1D37]">Kegiatan Terbaru</h3>
          <button className="text-sm text-[#1565C0] font-medium">Lihat Semua</button>
        </div>
        
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card key={activity.id} className="p-4 border-0 shadow-sm bg-white">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#1565C0]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#1565C0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-[#0A1D37] text-sm line-clamp-1">
                      {activity.title}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs flex-shrink-0 ${
                        activity.status === 'selesai' ? 'bg-green-100 text-green-700' :
                        activity.status === 'pelaksanaan' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {activity.status === 'selesai' ? 'Selesai' :
                       activity.status === 'pelaksanaan' ? 'Berlangsung' :
                       'Perencanaan'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{activity.date} • {activity.time}</p>
                  <p className="text-xs text-gray-500 mt-1">📍 {activity.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Access - Conditional based on role */}
      {(userRole === 'admin' || userRole === 'bendahara' || userRole === 'ketua_divisi') && (
        <div className="mt-8 px-4">
          <h3 className="font-semibold text-[#0A1D37] mb-4">Akses Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            {userRole === 'admin' && (
              <>
                <button className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
                  <Award className="w-8 h-8 text-[#1565C0] mb-2" />
                  <p className="text-sm font-medium text-[#0A1D37]">Tambah Kegiatan</p>
                </button>
                <button className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
                  <Users className="w-8 h-8 text-[#1565C0] mb-2" />
                  <p className="text-sm font-medium text-[#0A1D37]">Kelola Anggota</p>
                </button>
              </>
            )}
            {userRole === 'bendahara' && (
              <>
                <button className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
                  <Wallet className="w-8 h-8 text-[#1565C0] mb-2" />
                  <p className="text-sm font-medium text-[#0A1D37]">Input Transaksi</p>
                </button>
                <button className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
                  <TrendingUp className="w-8 h-8 text-[#1565C0] mb-2" />
                  <p className="text-sm font-medium text-[#0A1D37]">Laporan Keuangan</p>
                </button>
              </>
            )}
            {userRole === 'ketua_divisi' && (
              <>
                <button className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
                  <ClipboardList className="w-8 h-8 text-[#1565C0] mb-2" />
                  <p className="text-sm font-medium text-[#0A1D37]">Tambah Jobdesk</p>
                </button>
                <button className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#1565C0] transition-colors">
                  <Users className="w-8 h-8 text-[#1565C0] mb-2" />
                  <p className="text-sm font-medium text-[#0A1D37]">Anggota Divisi</p>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Announcements Preview */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#0A1D37]">Pengumuman Terbaru</h3>
          <button className="text-sm text-[#1565C0] font-medium">Lihat Semua</button>
        </div>
        
        <div className="space-y-2">
          {recentAnnouncements.map((announcement, index) => (
            <Card key={index} className="p-3 border-0 shadow-sm bg-white">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  announcement.priority === 'high' ? 'bg-red-500' :
                  announcement.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-[#0A1D37] text-sm mb-1">
                    {announcement.title}
                  </h4>
                  <p className="text-xs text-gray-500">{announcement.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
