import { useState } from 'react';
import { Plus, CheckCircle, Clock, XCircle, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { UserRole, Jobdesk, JobdeskStatus } from '@/types';
import { mockJobdesks } from '@/data/mockData';

interface JobdeskProps {
  userRole: UserRole;
  userName: string;
  userDivision?: string;
}

export function JobdeskManagement({ userRole, userName, userDivision }: JobdeskProps) {
  const [jobdesks, setJobdesks] = useState<Jobdesk[]>(mockJobdesks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    division: userDivision || '',
    title: '',
    description: '',
    status: 'belum_dikerjakan' as JobdeskStatus,
    dueDate: '',
  });

  const canManage = userRole === 'admin' || userRole === 'ketua_divisi';

  // Filter jobdesks based on role
  const filteredJobdesks = userRole === 'admin' || userRole === 'prodi'
    ? jobdesks
    : jobdesks.filter(j => j.division === userDivision);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJobdesk: Jobdesk = {
      id: Date.now().toString(),
      ...formData,
      assignedTo: [],
      createdBy: userName,
    };
    setJobdesks([newJobdesk, ...jobdesks]);
    setFormData({
      division: userDivision || '',
      title: '',
      description: '',
      status: 'belum_dikerjakan',
      dueDate: '',
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: JobdeskStatus) => {
    setJobdesks(jobdesks.map(j => 
      j.id === id ? { ...j, status: newStatus } : j
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus jobdesk ini?')) {
      setJobdesks(jobdesks.filter(j => j.id !== id));
    }
  };

  const getStatusIcon = (status: JobdeskStatus) => {
    switch (status) {
      case 'belum_dikerjakan': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'dalam_proses': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'selesai': return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: JobdeskStatus) => {
    switch (status) {
      case 'belum_dikerjakan': return 'bg-red-100 text-red-700 border-red-200';
      case 'dalam_proses': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'selesai': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusLabel = (status: JobdeskStatus) => {
    switch (status) {
      case 'belum_dikerjakan': return 'Belum Dikerjakan';
      case 'dalam_proses': return 'Dalam Proses';
      case 'selesai': return 'Selesai';
    }
  };

  const getDivisionColor = (division: string) => {
    if (division.includes('Acara')) return 'bg-blue-100 text-blue-700';
    if (division.includes('Humas')) return 'bg-green-100 text-green-700';
    if (division.includes('Multimedia')) return 'bg-orange-100 text-orange-700';
    if (division.includes('Keilmuan')) return 'bg-purple-100 text-purple-700';
    return 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getJobdesksByStatus = (status: JobdeskStatus) => {
    return filteredJobdesks.filter(j => j.status === status);
  };

  const JobdeskCard = ({ jobdesk }: { jobdesk: Jobdesk }) => (
    <Card className="p-4 border-0 shadow-sm bg-white">
      <div className="flex items-start gap-3">
        {getStatusIcon(jobdesk.status)}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#0A1D37] mb-1">
                {jobdesk.title}
              </h3>
              <Badge className={`${getDivisionColor(jobdesk.division)} text-xs`}>
                {jobdesk.division}
              </Badge>
            </div>
            <Badge 
              variant="outline" 
              className={`text-xs flex-shrink-0 ${getStatusColor(jobdesk.status)}`}
            >
              {getStatusLabel(jobdesk.status)}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            {jobdesk.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-gray-500">
              {jobdesk.dueDate && (
                <p>Deadline: {formatDate(jobdesk.dueDate)}</p>
              )}
              <p className="mt-1">Dibuat oleh: {jobdesk.createdBy}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canManage && jobdesk.status !== 'selesai' && (
              <>
                {jobdesk.status === 'belum_dikerjakan' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(jobdesk.id, 'dalam_proses')}
                    className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                  >
                    Mulai Kerjakan
                  </Button>
                )}
                {jobdesk.status === 'dalam_proses' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(jobdesk.id, 'selesai')}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    Selesaikan
                  </Button>
                )}
              </>
            )}
            
            {canManage && (
              <div className="ml-auto flex gap-1">
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
                  onClick={() => handleDelete(jobdesk.id)}
                  className="h-8 px-2 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const divisions = ['Divisi Acara', 'Divisi Humas', 'Divisi Multimedia', 'Divisi Keilmuan'];

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Jobdesk Divisi</h2>
            <p className="text-sm text-gray-600">
              {userRole === 'admin' || userRole === 'prodi' 
                ? 'Semua divisi' 
                : userDivision}
            </p>
          </div>
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
                  <DialogTitle>Tambah Jobdesk</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="division">Divisi</Label>
                    <Select
                      value={formData.division}
                      onValueChange={(value) => setFormData({ ...formData, division: value })}
                      disabled={userRole === 'ketua_divisi'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih divisi" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map(div => (
                          <SelectItem key={div} value={div}>{div}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Jobdesk</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Judul jobdesk"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Deskripsi tugas..."
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Deadline (Opsional)</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 border-0 shadow-sm bg-white text-center">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-xl font-bold text-[#0A1D37]">
              {getJobdesksByStatus('belum_dikerjakan').length}
            </p>
            <p className="text-xs text-gray-600">Belum</p>
          </Card>
          <Card className="p-3 border-0 shadow-sm bg-white text-center">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-xl font-bold text-[#0A1D37]">
              {getJobdesksByStatus('dalam_proses').length}
            </p>
            <p className="text-xs text-gray-600">Proses</p>
          </Card>
          <Card className="p-3 border-0 shadow-sm bg-white text-center">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xl font-bold text-[#0A1D37]">
              {getJobdesksByStatus('selesai').length}
            </p>
            <p className="text-xs text-gray-600">Selesai</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="belum">Belum</TabsTrigger>
            <TabsTrigger value="proses">Proses</TabsTrigger>
            <TabsTrigger value="selesai">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {filteredJobdesks.map((jobdesk) => (
              <JobdeskCard key={jobdesk.id} jobdesk={jobdesk} />
            ))}
            {filteredJobdesks.length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Belum ada jobdesk</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="belum" className="space-y-3 mt-4">
            {getJobdesksByStatus('belum_dikerjakan').map((jobdesk) => (
              <JobdeskCard key={jobdesk.id} jobdesk={jobdesk} />
            ))}
            {getJobdesksByStatus('belum_dikerjakan').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada jobdesk yang belum dikerjakan</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="proses" className="space-y-3 mt-4">
            {getJobdesksByStatus('dalam_proses').map((jobdesk) => (
              <JobdeskCard key={jobdesk.id} jobdesk={jobdesk} />
            ))}
            {getJobdesksByStatus('dalam_proses').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada jobdesk dalam proses</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="selesai" className="space-y-3 mt-4">
            {getJobdesksByStatus('selesai').map((jobdesk) => (
              <JobdeskCard key={jobdesk.id} jobdesk={jobdesk} />
            ))}
            {getJobdesksByStatus('selesai').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Belum ada jobdesk selesai</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
