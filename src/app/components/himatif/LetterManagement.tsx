import { useState } from 'react';
import { Mail, FileText, Send, Inbox, CheckCircle, Clock, Plus } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { UserRole } from '@/types';

interface LetterManagementProps {
  userRole: UserRole;
}

interface Letter {
  id: string;
  number: string;
  subject: string;
  type: 'incoming' | 'outgoing';
  from?: string;
  to?: string;
  date: string;
  status: 'pending' | 'approved' | 'sent';
  category: string;
}

interface LetterTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

export function LetterManagement({ userRole }: LetterManagementProps) {
  const canManage = userRole === 'admin';

  const letters: Letter[] = [
    {
      id: '1',
      number: '001/HIMATIF/II/2026',
      subject: 'Permohonan Izin Kegiatan Workshop Flutter',
      type: 'outgoing',
      to: 'Dekan Fakultas Teknik',
      date: '5 Feb 2026',
      status: 'approved',
      category: 'Perizinan'
    },
    {
      id: '2',
      number: '002/HIMATIF/II/2026',
      subject: 'Undangan Seminar AI & Machine Learning',
      type: 'outgoing',
      to: 'Seluruh Mahasiswa TI',
      date: '8 Feb 2026',
      status: 'sent',
      category: 'Undangan'
    },
    {
      id: '3',
      number: '045/FT/II/2026',
      subject: 'Persetujuan Kegiatan Bakti Sosial',
      type: 'incoming',
      from: 'Dekan Fakultas Teknik',
      date: '2 Feb 2026',
      status: 'approved',
      category: 'Perizinan'
    },
    {
      id: '4',
      number: '003/HIMATIF/II/2026',
      subject: 'Proposal Kerjasama Sponsor',
      type: 'outgoing',
      to: 'PT. Tech Indonesia',
      date: '10 Feb 2026',
      status: 'pending',
      category: 'Kerjasama'
    }
  ];

  const templates: LetterTemplate[] = [
    {
      id: '1',
      name: 'Surat Permohonan Izin Kegiatan',
      description: 'Template surat izin untuk mengadakan kegiatan HIMATIF',
      category: 'Perizinan'
    },
    {
      id: '2',
      name: 'Surat Undangan Kegiatan',
      description: 'Template undangan resmi untuk acara HIMATIF',
      category: 'Undangan'
    },
    {
      id: '3',
      name: 'Surat Proposal Sponsorship',
      description: 'Template proposal kerjasama dengan sponsor',
      category: 'Kerjasama'
    },
    {
      id: '4',
      name: 'Surat Tugas Panitia',
      description: 'Template surat tugas untuk panitia kegiatan',
      category: 'Internal'
    },
    {
      id: '5',
      name: 'Surat Keterangan Anggota',
      description: 'Template surat keterangan keanggotaan HIMATIF',
      category: 'Keterangan'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      default: return 'bg-muted text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      default: return null;
    }
  };

  const incomingLetters = letters.filter(l => l.type === 'incoming');
  const outgoingLetters = letters.filter(l => l.type === 'outgoing');

  return (
    <div className="pb-24">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Manajemen Surat</h2>
            <p className="text-sm text-muted-foreground">Surat masuk & keluar HIMATIF</p>
          </div>
          {canManage && (
            <Button size="sm" className="bg-[#1565C0] hover:bg-[#0A1D37]">
              <Plus className="w-4 h-4 mr-2" />
              Buat Surat
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 border-0 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Inbox className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Surat Masuk</p>
                <p className="text-2xl font-bold text-foreground">
                  {incomingLetters.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-0 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Send className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Surat Keluar</p>
                <p className="text-2xl font-bold text-foreground">
                  {outgoingLetters.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Templates Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Template Surat</h3>
          <Card className="p-4 border-0 bg-card">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FBC02D] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1 bg-background">
                <h4 className="font-semibold text-foreground mb-1">
                  {templates.length} Template Tersedia
                </h4>
                <p className="text-sm text-muted-foreground">
                  Gunakan template untuk mempercepat pembuatan surat resmi
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {templates.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex-1 bg-background">
                    <p className="text-sm font-medium text-foreground">
                      {template.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {template.description}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 text-xs ml-2">
                    {template.category}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3 border-[#1565C0] text-[#1565C0]">
              Lihat Semua Template
            </Button>
          </Card>
        </div>

        {/* Letters Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="incoming">Masuk</TabsTrigger>
            <TabsTrigger value="outgoing">Keluar</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {letters.map((letter) => (
              <Card key={letter.id} className="p-4 border-0 bg-card">
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    letter.type === 'incoming' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {letter.type === 'incoming' ? (
                      <Inbox className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Send className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 bg-background min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 bg-background min-w-0">
                        <h4 className="font-semibold text-foreground text-sm">
                          {letter.subject}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          No: {letter.number}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(letter.status)} text-xs flex-shrink-0`}>
                        {getStatusIcon(letter.status)}
                        <span className="ml-1">
                          {letter.status === 'pending' ? 'Pending' :
                           letter.status === 'approved' ? 'Approved' : 'Terkirim'}
                        </span>
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-muted-foreground">
                        {letter.type === 'incoming' ? (
                          <p>📩 Dari: <span className="font-medium">{letter.from}</span></p>
                        ) : (
                          <p>📤 Kepada: <span className="font-medium">{letter.to}</span></p>
                        )}
                        <p className="mt-1">📅 {letter.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-[#1565C0] border-[#1565C0]">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="incoming" className="space-y-3 mt-4">
            {incomingLetters.map((letter) => (
              <Card key={letter.id} className="p-4 border-0 bg-card">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Inbox className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 bg-background min-w-0">
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {letter.subject}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      No: {letter.number} • Dari: {letter.from}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{letter.date}</p>
                      <Button variant="outline" size="sm" className="text-[#1565C0] border-[#1565C0]">
                        Lihat
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {incomingLetters.length === 0 && (
              <Card className="p-8 text-center bg-card">
                <p className="text-muted-foreground">Tidak ada surat masuk</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-3 mt-4">
            {outgoingLetters.map((letter) => (
              <Card key={letter.id} className="p-4 border-0 bg-card">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Send className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 bg-background min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {letter.subject}
                      </h4>
                      <Badge className={getStatusColor(letter.status)}>
                        {letter.status === 'sent' ? 'Terkirim' : 
                         letter.status === 'approved' ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      No: {letter.number} • Kepada: {letter.to}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{letter.date}</p>
                      {canManage && letter.status === 'pending' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-7">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {outgoingLetters.length === 0 && (
              <Card className="p-8 text-center bg-card">
                <p className="text-muted-foreground">Tidak ada surat keluar</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Digital Approval Info */}
        <Card className="p-4 mt-6 border-[#1565C0] bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1565C0] flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 bg-background">
              <h4 className="font-semibold text-foreground mb-1">
                Approval Digital
              </h4>
              <p className="text-sm text-muted-foreground">
                Semua surat memerlukan persetujuan digital dari ketua sebelum dikirim. Proses approval dilakukan melalui aplikasi.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
