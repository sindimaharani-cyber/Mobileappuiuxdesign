import { useState } from 'react';
import { FolderOpen, FileText, Image, Video, Download, Upload, Search } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { UserRole } from '@/types';

interface DocumentationProps {
  userRole: UserRole;
}

interface Document {
  id: string;
  title: string;
  type: 'lpj' | 'proposal' | 'notulen' | 'photo' | 'video';
  category: string;
  uploadDate: string;
  size: string;
  uploadedBy: string;
}

export function Documentation({ userRole }: DocumentationProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const canManage = userRole === 'admin' || userRole === 'ketua_divisi';

  const documents: Document[] = [
    {
      id: '1',
      title: 'LPJ Workshop Flutter Development',
      type: 'lpj',
      category: 'Kegiatan',
      uploadDate: '12 Feb 2026',
      size: '2.5 MB',
      uploadedBy: 'Budi Santoso'
    },
    {
      id: '2',
      title: 'Proposal Seminar AI & Machine Learning',
      type: 'proposal',
      category: 'Kegiatan',
      uploadDate: '5 Feb 2026',
      size: '1.8 MB',
      uploadedBy: 'Sindi Maharani'
    },
    {
      id: '3',
      title: 'Notulen Rapat Koordinasi Januari 2026',
      type: 'notulen',
      category: 'Rapat',
      uploadDate: '28 Jan 2026',
      size: '450 KB',
      uploadedBy: 'Ahmad Rizki'
    },
    {
      id: '4',
      title: 'Dokumentasi Bakti Sosial',
      type: 'photo',
      category: 'Kegiatan',
      uploadDate: '26 Jan 2026',
      size: '15 MB',
      uploadedBy: 'Eko Prasetyo'
    },
    {
      id: '5',
      title: 'Video Highlight Turnamen E-Sport',
      type: 'video',
      category: 'Kegiatan',
      uploadDate: '22 Jan 2026',
      size: '45 MB',
      uploadedBy: 'Eko Prasetyo'
    }
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'lpj':
      case 'proposal':
      case 'notulen':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'photo':
        return <Image className="w-6 h-6 text-green-600" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-600" />;
      default:
        return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const getDocumentColor = (type: string) => {
    switch (type) {
      case 'lpj': return 'bg-blue-100';
      case 'proposal': return 'bg-green-100';
      case 'notulen': return 'bg-yellow-100';
      case 'photo': return 'bg-purple-100';
      case 'video': return 'bg-pink-100';
      default: return 'bg-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lpj': return 'LPJ';
      case 'proposal': return 'Proposal';
      case 'notulen': return 'Notulen';
      case 'photo': return 'Foto';
      case 'video': return 'Video';
      default: return type;
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const documentsByType = (type: string) => 
    filteredDocuments.filter(doc => doc.type === type);

  const allDocuments = filteredDocuments;

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Dokumentasi & Arsip</h2>
            <p className="text-sm text-gray-600">Repository dokumen HIMATIF</p>
          </div>
          {canManage && (
            <Button size="sm" className="bg-[#1565C0] hover:bg-[#0A1D37]">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 border-0 shadow-sm bg-white text-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-[#0A1D37]">
              {documents.filter(d => ['lpj', 'proposal', 'notulen'].includes(d.type)).length}
            </p>
            <p className="text-xs text-gray-600">Dokumen</p>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-white text-center">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Image className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-lg font-bold text-[#0A1D37]">
              {documents.filter(d => d.type === 'photo').length}
            </p>
            <p className="text-xs text-gray-600">Foto</p>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-white text-center">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <Video className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-[#0A1D37]">
              {documents.filter(d => d.type === 'video').length}
            </p>
            <p className="text-xs text-gray-600">Video</p>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        {/* Cloud Storage Info */}
        <Card className="p-4 mb-6 border-[#1565C0] bg-blue-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1565C0] flex items-center justify-center flex-shrink-0">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[#0A1D37] mb-1">
                Cloud Storage Terintegrasi
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Semua dokumen tersimpan dengan aman di cloud storage dan dapat diakses kapan saja.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-[#1565C0] h-full rounded-full" style={{width: '45%'}}></div>
                </div>
                <span>4.5 GB / 10 GB</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Documents Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="lpj">LPJ</TabsTrigger>
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
            <TabsTrigger value="notulen">Notulen</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {allDocuments.map((doc) => (
              <Card key={doc.id} className="p-4 border-0 shadow-sm bg-white">
                <div className="flex gap-3">
                  <div className={`w-12 h-12 rounded-lg ${getDocumentColor(doc.type)} flex items-center justify-center flex-shrink-0`}>
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-[#0A1D37] text-sm">
                        {doc.title}
                      </h4>
                      <Badge className="text-xs bg-gray-100 text-gray-700 flex-shrink-0">
                        {getTypeLabel(doc.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {doc.category} • {doc.size}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {doc.uploadedBy} • {doc.uploadDate}
                      </p>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-[#1565C0]">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="lpj" className="space-y-3 mt-4">
            {documentsByType('lpj').map((doc) => (
              <Card key={doc.id} className="p-4 border-0 shadow-sm bg-white">
                <div className="flex gap-3">
                  <div className={`w-12 h-12 rounded-lg ${getDocumentColor(doc.type)} flex items-center justify-center flex-shrink-0`}>
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#0A1D37] text-sm mb-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {doc.size} • {doc.uploadDate}
                    </p>
                    <Button variant="outline" size="sm" className="w-full border-[#1565C0] text-[#1565C0]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {documentsByType('lpj').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada dokumen LPJ</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="proposal" className="space-y-3 mt-4">
            {documentsByType('proposal').map((doc) => (
              <Card key={doc.id} className="p-4 border-0 shadow-sm bg-white">
                <div className="flex gap-3">
                  <div className={`w-12 h-12 rounded-lg ${getDocumentColor(doc.type)} flex items-center justify-center flex-shrink-0`}>
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#0A1D37] text-sm mb-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {doc.size} • {doc.uploadDate}
                    </p>
                    <Button variant="outline" size="sm" className="w-full border-[#1565C0] text-[#1565C0]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {documentsByType('proposal').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada proposal</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="notulen" className="space-y-3 mt-4">
            {documentsByType('notulen').map((doc) => (
              <Card key={doc.id} className="p-4 border-0 shadow-sm bg-white">
                <div className="flex gap-3">
                  <div className={`w-12 h-12 rounded-lg ${getDocumentColor(doc.type)} flex items-center justify-center flex-shrink-0`}>
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#0A1D37] text-sm mb-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {doc.size} • {doc.uploadDate}
                    </p>
                    <Button variant="outline" size="sm" className="w-full border-[#1565C0] text-[#1565C0]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {documentsByType('notulen').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada notulen</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
