import { Bell, MessageSquare, Award, FileText, Clock, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { UserRole } from '@/types';

interface NotificationsProps {
  userRole: UserRole;
}

interface Notification {
  id: string;
  type: 'rapat' | 'deadline' | 'reminder' | 'info' | 'achievement';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export function Notifications({ userRole }: NotificationsProps) {
  const [notifList, setNotifList] = useState<Notification[]>([
    {
      id: '1',
      type: 'rapat',
      title: 'Rapat Mendadak!',
      message: 'Rapat koordinasi pengurus akan diadakan hari ini pukul 16.00 WIB di Ruang Rapat HIMATIF.',
      time: '5 menit lalu',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'deadline',
      title: 'Deadline Pendaftaran',
      message: 'Pendaftaran Seminar AI & Machine Learning akan ditutup besok pukul 23.59 WIB. Segera daftar!',
      time: '1 jam lalu',
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Reminder Kegiatan',
      message: 'Jangan lupa! Workshop Flutter Development akan dimulai besok jam 09.00 WIB.',
      time: '2 jam lalu',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Prestasi Anggota',
      message: 'Selamat! Ahmad Fauzi berhasil menjuarai Hackathon Nasional 2026. Mari kita ucapkan selamat!',
      time: '1 hari lalu',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'info',
      title: 'Pengumuman Keuangan',
      message: 'Laporan keuangan bulan Januari telah tersedia. Silakan cek di menu Keuangan.',
      time: '2 hari lalu',
      read: true,
      priority: 'low'
    }
  ]);

  const getIcon = (type: string) => {
    const cls = { display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'10px', flexShrink: 0 as const };
    switch (type) {
      case 'rapat': return <div style={{ ...cls, background: 'rgba(239,68,68,0.15)' }}><MessageSquare size={18} style={{ color: '#EF4444' }} /></div>;
      case 'deadline': return <div style={{ ...cls, background: 'rgba(251,192,45,0.15)' }}><Clock size={18} style={{ color: '#FBC02D' }} /></div>;
      case 'reminder': return <div style={{ ...cls, background: 'rgba(96,165,250,0.15)' }}><Bell size={18} style={{ color: '#60A5FA' }} /></div>;
      case 'achievement': return <div style={{ ...cls, background: 'rgba(251,192,45,0.15)' }}><Award size={18} style={{ color: '#FBC02D' }} /></div>;
      case 'info': return <div style={{ ...cls, background: 'rgba(52,211,153,0.15)' }}><FileText size={18} style={{ color: '#34D399' }} /></div>;
      default: return <div style={{ ...cls, background: 'rgba(136,153,170,0.15)' }}><Bell size={18} style={{ color: '#8899AA' }} /></div>;
    }
  };

  const notifications = notifList;
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifList(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="pb-24 min-h-screen" style={{ background: '#060E1C' }}>
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Notifikasi</h2>
            <p className="text-sm text-muted-foreground">
              {unreadCount} notifikasi belum dibaca
            </p>
          </div>
          <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#1565C0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
            <CheckCheck size={14} /> Baca Semua
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-2">
          {notifications.map((notification) => {
            const pDot: Record<string, string> = { high: '#EF4444', medium: '#FBC02D', low: '#34D399' };
            return (
              <div key={notification.id}
                style={{ borderRadius: '16px', padding: '14px', background: notification.read ? '#0D1B2E' : 'rgba(21,101,192,0.12)', border: notification.read ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(21,101,192,0.3)', display: 'flex', gap: '12px' }}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}>{getIcon(notification.type)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                    <p style={{ fontWeight: notification.read ? 500 : 700, fontSize: '13px', color: '#E8EDF5' }}>{notification.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: pDot[notification.priority] }} />
                      {!notification.read && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1565C0' }} />}
                    </div>
                  </div>
                  <p style={{ color: '#8899AA', fontSize: '12px', lineHeight: 1.5, marginBottom: '6px' }}>{notification.message}</p>
                  <p style={{ color: '#8899AA', fontSize: '10px' }}>{notification.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
