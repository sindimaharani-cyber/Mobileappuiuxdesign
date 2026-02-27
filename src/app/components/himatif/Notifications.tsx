import { Bell, Calendar, MessageSquare, Award, Users, FileText, UserPlus, Clock } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
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
  const notifications: Notification[] = [
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
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'rapat': return <MessageSquare className="w-5 h-5 text-red-500" />;
      case 'deadline': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'reminder': return <Bell className="w-5 h-5 text-blue-500" />;
      case 'achievement': return <Award className="w-5 h-5 text-yellow-500" />;
      case 'info': return <FileText className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Notifikasi</h2>
            <p className="text-sm text-gray-600">
              {unreadCount} notifikasi belum dibaca
            </p>
          </div>
          <Button variant="ghost" size="sm" className="text-[#1565C0]">
            Tandai Semua Dibaca
          </Button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`p-4 border-0 shadow-sm ${
                notification.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-l-[#1565C0]'
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold ${
                      notification.read ? 'text-gray-700' : 'text-[#0A1D37]'
                    }`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div 
                        className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}
                        title={notification.priority}
                      ></div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#1565C0] rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card className="p-12 text-center bg-white">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada notifikasi</p>
          </Card>
        )}
      </div>
    </div>
  );
}
