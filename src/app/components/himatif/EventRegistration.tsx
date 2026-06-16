import { useState } from 'react';
import { QrCode, UserCheck, Download, Calendar, Users, CheckCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { UserRole } from '@/types';

interface EventRegistrationProps {
  userRole: UserRole;
  userName: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  quota: number;
  registered: number;
  status: 'open' | 'closed' | 'ongoing';
  isRegistered: boolean;
}

interface Attendance {
  eventId: string;
  eventName: string;
  date: string;
  status: 'hadir' | 'tidak_hadir' | 'pending';
}

export function EventRegistration({ userRole, userName }: EventRegistrationProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showQR, setShowQR] = useState(false);

  const events: Event[] = [
    {
      id: '1',
      title: 'Workshop Flutter Development',
      date: '10 Februari 2026',
      location: 'Lab Komputer 1',
      quota: 50,
      registered: 35,
      status: 'open',
      isRegistered: false
    },
    {
      id: '2',
      title: 'Seminar AI & Machine Learning',
      date: '15 Februari 2026',
      location: 'Auditorium Kampus',
      quota: 100,
      registered: 78,
      status: 'open',
      isRegistered: true
    },
    {
      id: '3',
      title: 'Bakti Sosial HIMATIF',
      date: '25 Januari 2026',
      location: 'Panti Asuhan Al-Hikmah',
      quota: 30,
      registered: 30,
      status: 'closed',
      isRegistered: true
    }
  ];

  const myAttendance: Attendance[] = [
    {
      eventId: '3',
      eventName: 'Bakti Sosial HIMATIF',
      date: '25 Januari 2026',
      status: 'hadir'
    },
    {
      eventId: '4',
      eventName: 'Turnamen E-Sport HIMATIF Cup',
      date: '20 Januari 2026',
      status: 'hadir'
    }
  ];

  const handleRegister = (event: Event) => {
    // Logic to register for event
    alert(`Berhasil mendaftar untuk ${event.title}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700 border-green-200';
      case 'closed': return 'bg-red-100 text-red-700 border-red-200';
      case 'ongoing': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-muted text-gray-700 border-border';
    }
  };

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'hadir': return 'bg-green-100 text-green-700';
      case 'tidak_hadir': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-muted text-gray-700';
    }
  };

  return (
    <div className="pb-24">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Pendaftaran & Absensi</h2>
          <p className="text-sm text-muted-foreground">Event dan kehadiran kegiatan</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 border-0 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#1565C0]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Event Terdaftar</p>
                <p className="text-2xl font-bold text-foreground">
                  {events.filter(e => e.isRegistered).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-0 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Kehadiran</p>
                <p className="text-2xl font-bold text-foreground">
                  {myAttendance.filter(a => a.status === 'hadir').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* QR Code for Attendance */}
        <Card className="p-5 mb-6 border-0 shadow-md bg-gradient-to-br from-[#1565C0] to-[#FBC02D] text-white">
          <div className="text-center">
            <QrCode className="w-16 h-16 mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Kode Absensi Anda</h3>
            <p className="text-sm opacity-90 mb-4">
              Tunjukkan QR code ini untuk absensi kegiatan
            </p>
            <Button
              onClick={() => setShowQR(true)}
              className="bg-white text-[#1565C0] hover:bg-white/90"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Tampilkan QR Code
            </Button>
          </div>
        </Card>

        {/* Available Events */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Event Tersedia</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id} className="p-4 border-0 bg-card">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 bg-background">
                    <h4 className="font-semibold text-foreground mb-1">
                      {event.title}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        📅 {event.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        📍 {event.location}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(event.status)} flex-shrink-0`}
                  >
                    {event.status === 'open' ? 'Buka' : 
                     event.status === 'closed' ? 'Tutup' : 'Berlangsung'}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 bg-background bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#1565C0] h-full transition-all"
                      style={{ width: `${(event.registered / event.quota) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {event.registered}/{event.quota}
                  </span>
                </div>

                <div className="flex gap-2">
                  {event.isRegistered ? (
                    <>
                      <Badge className="bg-green-100 text-green-700 flex-1 justify-center">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Sudah Terdaftar
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        Detail
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleRegister(event)}
                      disabled={event.status !== 'open'}
                      className="w-full bg-[#1565C0] hover:bg-[#0A1D37]"
                      size="sm"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Daftar Sekarang
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Attendance History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Riwayat Kehadiran</h3>
            <Button variant="ghost" size="sm" className="text-[#1565C0]">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="space-y-3">
            {myAttendance.map((attendance, index) => (
              <Card key={index} className="p-4 border-0 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-background">
                    <h4 className="font-medium text-foreground mb-1">
                      {attendance.eventName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {attendance.date}
                    </p>
                  </div>
                  <Badge className={getAttendanceColor(attendance.status)}>
                    {attendance.status === 'hadir' ? '✓ Hadir' : 
                     attendance.status === 'tidak_hadir' ? '✗ Tidak Hadir' : 'Pending'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* QR Code Dialog */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>QR Code Absensi</DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <div className="w-64 h-64 mx-auto bg-card border-4 border-[#1565C0] rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-48 h-48 text-foreground" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-foreground mb-1">{userName}</p>
                <p className="text-sm text-muted-foreground">Scan untuk absensi</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
