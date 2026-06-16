import { Download, Award, Share2 } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

interface CertificatesProps {
  userName: string;
}

interface Certificate {
  id: string;
  eventName: string;
  role: string;
  date: string;
  category: 'peserta' | 'panitia' | 'pemateri';
  downloadUrl: string;
}

export function Certificates({ userName }: CertificatesProps) {
  const certificates: Certificate[] = [
    {
      id: '1',
      eventName: 'Seminar AI & Machine Learning 2026',
      role: 'Peserta',
      date: '15 Februari 2026',
      category: 'peserta',
      downloadUrl: '#'
    },
    {
      id: '2',
      eventName: 'Workshop Flutter Development',
      role: 'Panitia Acara',
      date: '10 Februari 2026',
      category: 'panitia',
      downloadUrl: '#'
    },
    {
      id: '3',
      eventName: 'Bakti Sosial HIMATIF 2026',
      role: 'Peserta',
      date: '25 Januari 2026',
      category: 'peserta',
      downloadUrl: '#'
    },
    {
      id: '4',
      eventName: 'Turnamen E-Sport HIMATIF Cup',
      role: 'Koordinator Acara',
      date: '20 Januari 2026',
      category: 'panitia',
      downloadUrl: '#'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'peserta': return 'bg-blue-100 text-blue-700';
      case 'panitia': return 'bg-purple-100 text-purple-700';
      case 'pemateri': return 'bg-orange-100 text-orange-700';
      default: return 'bg-muted text-gray-700';
    }
  };

  const handleDownload = (certificate: Certificate) => {
    alert(`Mengunduh sertifikat: ${certificate.eventName}`);
  };

  const handleShare = (certificate: Certificate) => {
    alert(`Membagikan sertifikat: ${certificate.eventName}`);
  };

  return (
    <div className="pb-24">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Sertifikat Digital</h2>
          <p className="text-sm text-muted-foreground">Koleksi sertifikat kegiatan Anda</p>
        </div>

        {/* Summary Card */}
        <Card className="p-5 mb-6 border-0 shadow-md bg-gradient-to-br from-[#FBC02D] to-[#FF9800] text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Sertifikat</p>
              <h3 className="text-4xl font-bold">{certificates.length}</h3>
              <p className="text-sm opacity-90 mt-2">
                {certificates.filter(c => c.category === 'panitia').length} sebagai panitia
              </p>
            </div>
            <Award className="w-20 h-20 opacity-80" />
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 border-0 shadow-sm bg-card text-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-foreground">
              {certificates.filter(c => c.category === 'peserta').length}
            </p>
            <p className="text-xs text-muted-foreground">Peserta</p>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-card text-center">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-foreground">
              {certificates.filter(c => c.category === 'panitia').length}
            </p>
            <p className="text-xs text-muted-foreground">Panitia</p>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-card text-center">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-lg font-bold text-foreground">
              {certificates.filter(c => c.category === 'pemateri').length}
            </p>
            <p className="text-xs text-muted-foreground">Pemateri</p>
          </Card>
        </div>

        {/* Certificates List */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Daftar Sertifikat</h3>
          <div className="space-y-3">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="p-0 border-0 shadow-sm bg-card overflow-hidden">
                {/* Certificate Header with Image */}
                <div className="relative h-32 bg-gradient-to-br from-[#0A1D37] via-[#1565C0] to-[#FBC02D] p-4 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Award className="w-12 h-12 mx-auto mb-2 opacity-90" />
                    <p className="text-xs opacity-80">SERTIFIKAT</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={getCategoryColor(certificate.category)}>
                      {certificate.category.charAt(0).toUpperCase() + certificate.category.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">
                    {certificate.eventName}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Sebagai:</span> {certificate.role}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    📅 {certificate.date}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(certificate)}
                      className="flex-1 bg-background bg-[#1565C0] hover:bg-[#0A1D37]"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      onClick={() => handleShare(certificate)}
                      variant="outline"
                      size="sm"
                      className="border-[#1565C0] text-[#1565C0]"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <Card className="p-12 text-center bg-card">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Belum ada sertifikat</p>
            <p className="text-sm text-muted-foreground">
              Ikuti kegiatan HIMATIF untuk mendapatkan sertifikat digital
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
