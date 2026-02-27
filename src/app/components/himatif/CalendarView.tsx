import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Download } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { UserRole } from '@/types';

interface CalendarViewProps {
  userRole: UserRole;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'rapat' | 'event' | 'deadline';
  date: string;
  time: string;
  location?: string;
  description: string;
}

export function CalendarView({ userRole }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Rapat Koordinasi Pengurus',
      type: 'rapat',
      date: '2026-02-05',
      time: '16:00 - 18:00 WIB',
      location: 'Ruang Rapat HIMATIF',
      description: 'Rapat koordinasi membahas agenda semester genap'
    },
    {
      id: '2',
      title: 'Workshop Flutter Development',
      type: 'event',
      date: '2026-02-10',
      time: '09:00 - 15:00 WIB',
      location: 'Lab Komputer 1',
      description: 'Workshop pengembangan aplikasi mobile'
    },
    {
      id: '3',
      title: 'Deadline Pendaftaran Seminar AI',
      type: 'deadline',
      date: '2026-02-12',
      time: '23:59 WIB',
      location: 'Online',
      description: 'Batas akhir pendaftaran seminar AI & ML'
    },
    {
      id: '4',
      title: 'Seminar AI & Machine Learning',
      type: 'event',
      date: '2026-02-15',
      time: '13:00 - 17:00 WIB',
      location: 'Auditorium Kampus',
      description: 'Seminar teknologi AI dan Machine Learning'
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'rapat': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'event': return 'bg-green-100 text-green-700 border-green-200';
      case 'deadline': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'rapat': return '👥';
      case 'event': return '🎉';
      case 'deadline': return '⏰';
      default: return '📅';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const canManage = userRole === 'admin';

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Kalender Kegiatan</h2>
            <p className="text-sm text-gray-600">Agenda & jadwal HIMATIF</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#1565C0] text-[#1565C0]"
            >
              <Download className="w-4 h-4 mr-2" />
              Sync
            </Button>
            {canManage && (
              <Button size="sm" className="bg-[#1565C0] hover:bg-[#0A1D37]">
                <Plus className="w-4 h-4 mr-2" />
                Tambah
              </Button>
            )}
          </div>
        </div>

        {/* Mini Calendar Card */}
        <Card className="p-5 mb-6 border-0 shadow-md bg-gradient-to-br from-[#0A1D37] to-[#1565C0] text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm opacity-90">Bulan Ini</p>
              <h3 className="text-2xl font-bold">Februari 2026</h3>
            </div>
            <CalendarIcon className="w-12 h-12 opacity-80" />
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 text-center p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <p className="text-2xl font-bold">{events.filter(e => e.type === 'rapat').length}</p>
              <p className="text-xs opacity-90">Rapat</p>
            </div>
            <div className="flex-1 text-center p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <p className="text-2xl font-bold">{events.filter(e => e.type === 'event').length}</p>
              <p className="text-xs opacity-90">Event</p>
            </div>
            <div className="flex-1 text-center p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <p className="text-2xl font-bold">{events.filter(e => e.type === 'deadline').length}</p>
              <p className="text-xs opacity-90">Deadline</p>
            </div>
          </div>
        </Card>

        {/* Sync to Google Calendar Info */}
        <Card className="p-4 mb-6 border-[#1565C0] bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1565C0] flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[#0A1D37] mb-1">
                Sinkronisasi Google Calendar
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Sinkronkan jadwal HIMATIF ke Google Calendar Anda untuk notifikasi otomatis.
              </p>
              <Button size="sm" variant="outline" className="border-[#1565C0] text-[#1565C0]">
                Hubungkan Sekarang
              </Button>
            </div>
          </div>
        </Card>

        {/* Events List */}
        <div>
          <h3 className="font-semibold text-[#0A1D37] mb-3">Jadwal Mendatang</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id} className="p-4 border-0 shadow-sm bg-white">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 text-3xl">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-[#0A1D37]">
                        {event.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs flex-shrink-0 ${getEventColor(event.type)}`}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {event.description}
                    </p>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 text-[#1565C0]" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-[#1565C0]" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-[#1565C0]" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-[#1565C0] text-[#1565C0]"
                      >
                        + Tambah ke Kalender
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="px-3"
                      >
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
