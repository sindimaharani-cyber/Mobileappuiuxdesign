import { Calendar, Users, Wallet, ClipboardList, TrendingUp, Award, ArrowRight, Megaphone, Zap } from 'lucide-react';
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
    { title: 'Rapat Koordinasi Pengurus HIMATIF', date: '2 jam lalu', priority: 'high', tag: 'Wajib' },
    { title: 'Pendaftaran Seminar Teknologi AI', date: '1 hari lalu', priority: 'medium', tag: 'Kegiatan' },
    { title: 'Laporan Keuangan Bulan Mei 2024', date: '3 hari lalu', priority: 'low', tag: 'Keuangan' },
  ];

  const STATUS_CFG: Record<string, {label:string; color:string; bg:string}> = {
    selesai: { label:'Selesai', color:'#34D399', bg:'rgba(52,211,153,0.12)' },
    pelaksanaan: { label:'Berlangsung', color:'#60A5FA', bg:'rgba(96,165,250,0.12)' },
    perencanaan: { label:'Perencanaan', color:'#FBC02D', bg:'rgba(251,192,45,0.12)' },
  };

  const QUICK_LINKS: Record<string, Array<{icon: any; label:string; color:string}>> = {
    admin: [
      { icon: Award, label: 'Buat Kegiatan', color: '#1565C0' },
      { icon: Users, label: 'Kelola Anggota', color: '#7C3AED' },
      { icon: Megaphone, label: 'Buat Pengumuman', color: '#059669' },
      { icon: Zap, label: 'Sprint Board', color: '#D97706' },
    ],
    bendahara: [
      { icon: Wallet, label: 'Input Transaksi', color: '#1565C0' },
      { icon: TrendingUp, label: 'Laporan Keuangan', color: '#059669' },
    ],
    ketua_divisi: [
      { icon: ClipboardList, label: 'Tambah Jobdesk', color: '#1565C0' },
      { icon: Zap, label: 'Sprint Board', color: '#D97706' },
    ],
  };

  const quickLinks = QUICK_LINKS[userRole] || [];

  return (
    <div className="pb-24" style={{ minHeight: '100vh', background: '#060E1C' }}>

      {/* Hero Banner */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0A1D37 0%, #1565C0 60%, #0D47A1 100%)', minHeight: '140px' }}>
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 50%, #FBC02D, transparent 60%)' }} />
        <div className="relative p-5 pt-6">
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '4px' }}>{getGreeting()},</p>
          <h2 className="font-bold text-white" style={{ fontSize: '20px', lineHeight: 1.3 }}>{userName}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '4px' }}>Selamat beraktivitas di HIMATIF UIR 🎓</p>
          <div className="mt-4 flex items-center gap-2">
            <div style={{ background: 'rgba(251,192,45,0.2)', border: '1px solid rgba(251,192,45,0.35)', borderRadius: '8px', padding: '4px 10px' }}>
              <span style={{ color: '#FBC02D', fontSize: '11px', fontWeight: 600 }}>Sprint 3 Aktif</span>
            </div>
            <div style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '8px', padding: '4px 10px' }}>
              <span style={{ color: '#34D399', fontSize: '11px', fontWeight: 600 }}>{upcomingActivities} Kegiatan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 mt-5">
        {visibleStats.map((stat, i) => {
          const Icon = stat.icon;
          const colors = ['#1565C0','#7C3AED','#059669','#D97706'];
          const c = colors[i % colors.length];
          return (
            <div key={i} className="rounded-2xl p-4" style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${c}20` }}>
                <Icon size={20} style={{ color: c }} />
              </div>
              <p className="font-bold text-white" style={{ fontSize: '22px', lineHeight: 1.1 }}>{stat.value}</p>
              <p style={{ color: '#8899AA', fontSize: '11px', marginTop: '2px' }}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      {quickLinks.length > 0 && (
        <div className="mt-6 px-4">
          <p className="font-semibold mb-3" style={{ color: '#E8EDF5', fontSize: '14px' }}>Akses Cepat</p>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((ql, i) => {
              const Icon = ql.icon;
              return (
                <button key={i} className="rounded-2xl p-4 text-left transition-all active:scale-95"
                  style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${ql.color}20` }}>
                    <Icon size={20} style={{ color: ql.color }} />
                  </div>
                  <p style={{ color: '#E8EDF5', fontSize: '12px', fontWeight: 600 }}>{ql.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold" style={{ color: '#E8EDF5', fontSize: '14px' }}>Kegiatan Terbaru</p>
          <button className="flex items-center gap-1" style={{ color: '#1565C0', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
            Semua <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2.5">
          {recentActivities.map(activity => {
            const s = STATUS_CFG[activity.status] || STATUS_CFG.perencanaan;
            return (
              <div key={activity.id} className="rounded-2xl p-4" style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(21,101,192,0.15)' }}>
                    <Calendar size={18} style={{ color: '#1565C0' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-white truncate" style={{ fontSize: '13px' }}>{activity.title}</p>
                      <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '6px', background: s.bg, color: s.color, flexShrink: 0 }}>{s.label}</span>
                    </div>
                    <p style={{ color: '#8899AA', fontSize: '11px' }}>{activity.date} · {activity.time}</p>
                    <p style={{ color: '#8899AA', fontSize: '11px', marginTop: '2px' }}>📍 {activity.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold" style={{ color: '#E8EDF5', fontSize: '14px' }}>Pengumuman</p>
          <button className="flex items-center gap-1" style={{ color: '#1565C0', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
            Semua <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {recentAnnouncements.map((a, i) => {
            const dot = a.priority === 'high' ? '#EF4444' : a.priority === 'medium' ? '#FBC02D' : '#34D399';
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate" style={{ fontSize: '12px' }}>{a.title}</p>
                  <p style={{ color: '#8899AA', fontSize: '10px' }}>{a.date}</p>
                </div>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(21,101,192,0.15)', color: '#60A5FA', flexShrink: 0 }}>{a.tag}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
