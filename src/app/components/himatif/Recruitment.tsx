import { useState } from 'react';
import { UserPlus, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UserRole } from '@/types';

interface RecruitmentProps {
  userRole: UserRole;
}

interface RecruitmentPeriod {
  id: string;
  title: string;
  period: string;
  status: 'open' | 'closed' | 'selection';
  quota: number;
  applicants: number;
  deadline: string;
}

interface Application {
  id: string;
  applicantName: string;
  nim: string;
  angkatan: string;
  division: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
}

export function Recruitment({ userRole }: RecruitmentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    angkatan: '',
    email: '',
    phone: '',
    division: '',
    motivation: ''
  });

  const canManage = userRole === 'admin';

  const recruitmentPeriods: RecruitmentPeriod[] = [
    {
      id: '1',
      title: 'Open Recruitment Anggota HIMATIF 2026',
      period: 'Februari - Maret 2026',
      status: 'open',
      quota: 50,
      applicants: 32,
      deadline: '28 Februari 2026'
    }
  ];

  const applications: Application[] = [
    {
      id: '1',
      applicantName: 'Andi Wijaya',
      nim: '2024001',
      angkatan: '2024',
      division: 'Divisi Acara',
      status: 'pending',
      appliedDate: '3 Februari 2026'
    },
    {
      id: '2',
      applicantName: 'Sari Indah',
      nim: '2024002',
      angkatan: '2024',
      division: 'Divisi Humas',
      status: 'accepted',
      appliedDate: '2 Februari 2026'
    },
    {
      id: '3',
      applicantName: 'Rudi Hermawan',
      nim: '2024003',
      angkatan: '2024',
      division: 'Divisi Multimedia',
      status: 'pending',
      appliedDate: '1 Februari 2026'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pendaftaran berhasil dikirim!');
    setFormData({
      name: '',
      nim: '',
      angkatan: '',
      email: '',
      phone: '',
      division: '',
      motivation: ''
    });
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700 border-green-200';
      case 'closed': return 'bg-red-100 text-red-700 border-red-200';
      case 'selection': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-muted text-gray-700 border-border';
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-muted text-gray-700';
    }
  };

  const getApplicationStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="pb-24">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Rekrutmen Anggota</h2>
          <p className="text-sm text-muted-foreground">Open Member HIMATIF UIR</p>
        </div>

        {/* Active Recruitment */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Periode Rekrutmen</h3>
          {recruitmentPeriods.map((period) => (
            <Card key={period.id} className="p-5 border-0 shadow-md bg-gradient-to-br from-[#0A1D37] to-[#1565C0] text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 bg-background">
                  <h4 className="font-bold text-lg mb-2">{period.title}</h4>
                  <p className="text-sm opacity-90">{period.period}</p>
                </div>
                <Badge className={`${getStatusColor(period.status)} flex-shrink-0`}>
                  {period.status === 'open' ? 'Dibuka' :
                   period.status === 'closed' ? 'Ditutup' : 'Seleksi'}
                </Badge>
              </div>

              <div className="bg-white/20 rounded-lg p-3 mb-3 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Pendaftar</span>
                  <span className="font-semibold">{period.applicants}/{period.quota}</span>
                </div>
                <div className="w-full bg-card/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#FBC02D] h-full transition-all"
                    style={{ width: `${(period.applicants / period.quota) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="opacity-90">📅 Deadline: {period.deadline}</span>
              </div>

              {period.status === 'open' && !canManage && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#FBC02D] text-foreground hover:bg-[#FBC02D]/90">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Daftar Sekarang
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Formulir Pendaftaran</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Nama lengkap"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="nim">NIM</Label>
                          <Input
                            id="nim"
                            value={formData.nim}
                            onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                            placeholder="NIM"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="angkatan">Angkatan</Label>
                          <Input
                            id="angkatan"
                            value={formData.angkatan}
                            onChange={(e) => setFormData({ ...formData, angkatan: e.target.value })}
                            placeholder="2024"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@student.uir.ac.id"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. Telepon</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="081234567890"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="division">Divisi Pilihan</Label>
                        <Select
                          value={formData.division}
                          onValueChange={(value) => setFormData({ ...formData, division: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih divisi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Divisi Acara">Divisi Acara</SelectItem>
                            <SelectItem value="Divisi Humas">Divisi Humas</SelectItem>
                            <SelectItem value="Divisi Multimedia">Divisi Multimedia</SelectItem>
                            <SelectItem value="Divisi Keilmuan">Divisi Keilmuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motivation">Motivasi Bergabung</Label>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          placeholder="Ceritakan motivasi Anda..."
                          rows={4}
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1 bg-background bg-[#1565C0]">
                          Kirim Pendaftaran
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsDialogOpen(false)}
                          className="flex-1 bg-background"
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </Card>
          ))}
        </div>

        {/* Applications List (Admin only) */}
        {canManage && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Daftar Pendaftar</h3>
              <Badge className="bg-muted text-gray-700">
                {applications.length} pendaftar
              </Badge>
            </div>

            <div className="space-y-3">
              {applications.map((application) => (
                <Card key={application.id} className="p-4 border-0 bg-card">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 bg-background">
                      <h4 className="font-semibold text-foreground mb-1">
                        {application.applicantName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        NIM: {application.nim} • Angkatan {application.angkatan}
                      </p>
                      <Badge className="bg-blue-100 text-blue-700 text-xs mt-2">
                        {application.division}
                      </Badge>
                    </div>
                    <Badge className={getApplicationStatusColor(application.status)}>
                      {getApplicationStatusIcon(application.status)}
                      <span className="ml-1">
                        {application.status === 'pending' ? 'Menunggu' :
                         application.status === 'accepted' ? 'Diterima' : 'Ditolak'}
                      </span>
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">
                    Mendaftar: {application.appliedDate}
                  </p>

                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-background bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Terima
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-background border-red-600 text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        Tolak
                      </Button>
                      <Button size="sm" variant="outline" className="px-3">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
