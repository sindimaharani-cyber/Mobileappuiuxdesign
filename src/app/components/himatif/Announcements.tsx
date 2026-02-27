import { useState } from 'react';
import { Plus, Archive, Edit, Trash2, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UserRole, Announcement } from '@/types';
import { mockAnnouncements } from '@/data/mockData';

interface AnnouncementsProps {
  userRole: UserRole;
  userName: string;
}

export function Announcements({ userRole, userName }: AnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [showArchived, setShowArchived] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  const canManage = userRole === 'admin';

  const displayedAnnouncements = showArchived 
    ? announcements.filter(a => a.archived)
    : announcements.filter(a => !a.archived);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
      author: userName,
      archived: false,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', content: '', category: '' });
    setIsDialogOpen(false);
  };

  const handleArchive = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, archived: !a.archived } : a
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus pengumuman ini?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const getPriorityIcon = (category: string) => {
    if (category === 'Rapat' || category === 'Penting') return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (category === 'Acara') return <Info className="w-5 h-5 text-blue-500" />;
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Rapat': return 'bg-red-100 text-red-700 border-red-200';
      case 'Acara': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Keuangan': return 'bg-green-100 text-green-700 border-green-200';
      case 'Penting': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Pengumuman</h2>
            <p className="text-sm text-gray-600">
              {showArchived ? 'Arsip' : 'Aktif'} ({displayedAnnouncements.length})
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowArchived(!showArchived)}
              className="border-[#1565C0] text-[#1565C0]"
            >
              <Archive className="w-4 h-4 mr-2" />
              {showArchived ? 'Lihat Aktif' : 'Arsip'}
            </Button>
            {canManage && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#1565C0] hover:bg-[#0A1D37]">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Pengumuman</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Judul pengumuman"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rapat">Rapat</SelectItem>
                          <SelectItem value="Acara">Acara</SelectItem>
                          <SelectItem value="Keuangan">Keuangan</SelectItem>
                          <SelectItem value="Penting">Penting</SelectItem>
                          <SelectItem value="Informasi">Informasi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Isi Pengumuman</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Tulis isi pengumuman..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-[#1565C0]">
                        Simpan
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1"
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {displayedAnnouncements.length === 0 ? (
            <Card className="p-8 text-center bg-white">
              <p className="text-gray-500">
                {showArchived ? 'Tidak ada pengumuman di arsip' : 'Belum ada pengumuman'}
              </p>
            </Card>
          ) : (
            displayedAnnouncements.map((announcement) => (
              <Card 
                key={announcement.id} 
                className="p-4 border-0 shadow-sm bg-white"
              >
                <div className="flex gap-3">
                  {getPriorityIcon(announcement.category)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-[#0A1D37]">
                        {announcement.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs flex-shrink-0 ${getCategoryColor(announcement.category)}`}
                      >
                        {announcement.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {announcement.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <p>Oleh: <span className="font-medium">{announcement.author}</span></p>
                        <p className="mt-0.5">{formatDate(announcement.date)}</p>
                      </div>

                      {canManage && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleArchive(announcement.id)}
                            className="h-8 px-2"
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(announcement.id)}
                            className="h-8 px-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
