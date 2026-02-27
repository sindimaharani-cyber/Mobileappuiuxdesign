import { useState } from 'react';
import { Plus, Calendar, MapPin, Clock, Upload, Bell, Edit, Trash2, Eye } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Switch } from '@/app/components/ui/switch';
import { UserRole, Activity, ActivityStatus } from '@/types';
import { mockActivities } from '@/data/mockData';

interface ActivitiesProps {
  userRole: UserRole;
  userName: string;
}

export function Activities({ userRole, userName }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    status: 'perencanaan' as ActivityStatus,
    reminder: true,
  });

  const canManage = userRole === 'admin';

  const getActivitiesByStatus = (status: ActivityStatus) => {
    return activities.filter(a => a.status === status);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActivity: Activity = {
      id: Date.now().toString(),
      ...formData,
      documentation: [],
    };
    setActivities([newActivity, ...activities]);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      status: 'perencanaan',
      reminder: true,
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: ActivityStatus) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus kegiatan ini?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case 'perencanaan': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pelaksanaan': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'selesai': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getStatusLabel = (status: ActivityStatus) => {
    switch (status) {
      case 'perencanaan': return 'Perencanaan';
      case 'pelaksanaan': return 'Pelaksanaan';
      case 'selesai': return 'Selesai';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const ActivityCard = ({ activity }: { activity: Activity }) => (
    <Card className="p-4 border-0 shadow-sm bg-white">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-[#1565C0]/10 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-6 h-6 text-[#1565C0]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-[#0A1D37]">{activity.title}</h3>
            <Badge 
              variant="outline" 
              className={`text-xs flex-shrink-0 ${getStatusColor(activity.status)}`}
            >
              {getStatusLabel(activity.status)}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-3">{activity.description}</p>

          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-[#1565C0]" />
              <span>{formatDate(activity.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-[#1565C0]" />
              <span>{activity.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#1565C0]" />
              <span>{activity.location}</span>
            </div>
            {activity.reminder && (
              <div className="flex items-center gap-2 text-sm text-[#FBC02D]">
                <Bell className="w-4 h-4" />
                <span>Pengingat aktif</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedActivity(activity)}
              className="text-[#1565C0] border-[#1565C0]"
            >
              <Eye className="w-4 h-4 mr-2" />
              Detail
            </Button>

            {canManage && (
              <div className="flex gap-1">
                {activity.status === 'perencanaan' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusChange(activity.id, 'pelaksanaan')}
                    className="h-8 px-2 text-blue-600"
                    title="Mulai Pelaksanaan"
                  >
                    ▶
                  </Button>
                )}
                {activity.status === 'pelaksanaan' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusChange(activity.id, 'selesai')}
                    className="h-8 px-2 text-green-600"
                    title="Selesaikan"
                  >
                    ✓
                  </Button>
                )}
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
                  onClick={() => handleDelete(activity.id)}
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

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Kegiatan</h2>
            <p className="text-sm text-gray-600">Manajemen kegiatan HIMATIF</p>
          </div>
          {canManage && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#1565C0] hover:bg-[#0A1D37]">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tambah Kegiatan</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Nama Kegiatan</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Workshop Flutter Development"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Deskripsi kegiatan..."
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="date">Tanggal</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Waktu</Label>
                      <Input
                        id="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="09:00 - 15:00 WIB"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Lab Komputer 1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: ActivityStatus) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="perencanaan">Perencanaan</SelectItem>
                        <SelectItem value="pelaksanaan">Pelaksanaan</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder">Aktifkan Pengingat</Label>
                    <Switch
                      id="reminder"
                      checked={formData.reminder}
                      onCheckedChange={(checked) => setFormData({ ...formData, reminder: checked })}
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

        {/* Tabs */}
        <Tabs defaultValue="perencanaan" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="perencanaan">
              Perencanaan ({getActivitiesByStatus('perencanaan').length})
            </TabsTrigger>
            <TabsTrigger value="pelaksanaan">
              Pelaksanaan ({getActivitiesByStatus('pelaksanaan').length})
            </TabsTrigger>
            <TabsTrigger value="selesai">
              Selesai ({getActivitiesByStatus('selesai').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perencanaan" className="space-y-3 mt-4">
            {getActivitiesByStatus('perencanaan').map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            {getActivitiesByStatus('perencanaan').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada kegiatan dalam perencanaan</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pelaksanaan" className="space-y-3 mt-4">
            {getActivitiesByStatus('pelaksanaan').map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            {getActivitiesByStatus('pelaksanaan').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Tidak ada kegiatan dalam pelaksanaan</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="selesai" className="space-y-3 mt-4">
            {getActivitiesByStatus('selesai').map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            {getActivitiesByStatus('selesai').length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Belum ada kegiatan selesai</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Activity Detail Dialog */}
      {selectedActivity && (
        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedActivity.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Deskripsi</p>
                <p className="text-sm text-gray-600">{selectedActivity.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Tanggal</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedActivity.date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Waktu</p>
                  <p className="text-sm text-gray-600">{selectedActivity.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Lokasi</p>
                <p className="text-sm text-gray-600">{selectedActivity.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Status</p>
                <Badge className={getStatusColor(selectedActivity.status)}>
                  {getStatusLabel(selectedActivity.status)}
                </Badge>
              </div>
              {selectedActivity.documentation && selectedActivity.documentation.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Dokumentasi</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedActivity.documentation.map((doc, idx) => (
                      <div key={idx} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">Foto {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {canManage && selectedActivity.status === 'selesai' && (
                <Button className="w-full bg-[#1565C0]">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Dokumentasi
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
