import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone, UserCheck, UserX } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Avatar } from '@/app/components/ui/avatar';
import { UserRole, Member } from '@/types';
import { mockMembers } from '@/data/mockData';

interface MembersProps {
  userRole: UserRole;
}

export function Members({ userRole }: MembersProps) {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nim: '',
    name: '',
    angkatan: '',
    division: '',
    position: '',
    email: '',
    phone: '',
    status: 'aktif' as 'aktif' | 'tidak_aktif',
  });

  const canManage = userRole === 'admin';
  const canView = userRole === 'admin' || userRole === 'prodi';

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.nim.includes(searchQuery) ||
    member.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: Member = {
      id: Date.now().toString(),
      ...formData,
    };
    setMembers([...members, newMember]);
    setFormData({
      nim: '',
      name: '',
      angkatan: '',
      division: '',
      position: '',
      email: '',
      phone: '',
      status: 'aktif',
    });
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus anggota ini?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, status: m.status === 'aktif' ? 'tidak_aktif' : 'aktif' } : m
    ));
  };

  if (!canView) {
    return (
      <div className="pb-20 bg-[#F4F6F8] min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center bg-white max-w-md mx-4">
          <p className="text-gray-500">Anda tidak memiliki akses ke halaman ini</p>
        </Card>
      </div>
    );
  }

  const getDivisionColor = (division: string) => {
    if (division === 'Pengurus Inti') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (division.includes('Acara')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (division.includes('Humas')) return 'bg-green-100 text-green-700 border-green-200';
    if (division.includes('Multimedia')) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#0A1D37]">Data Anggota</h2>
            <p className="text-sm text-gray-600">
              Total {members.filter(m => m.status === 'aktif').length} anggota aktif
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
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tambah Anggota</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nim">NIM</Label>
                    <Input
                      id="nim"
                      value={formData.nim}
                      onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                      placeholder="2024001"
                      required
                    />
                  </div>
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
                      <Label htmlFor="angkatan">Angkatan</Label>
                      <Input
                        id="angkatan"
                        value={formData.angkatan}
                        onChange={(e) => setFormData({ ...formData, angkatan: e.target.value })}
                        placeholder="2024"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="division">Divisi</Label>
                      <Select
                        value={formData.division}
                        onValueChange={(value) => setFormData({ ...formData, division: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih divisi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pengurus Inti">Pengurus Inti</SelectItem>
                          <SelectItem value="Divisi Acara">Divisi Acara</SelectItem>
                          <SelectItem value="Divisi Humas">Divisi Humas</SelectItem>
                          <SelectItem value="Divisi Multimedia">Divisi Multimedia</SelectItem>
                          <SelectItem value="Divisi Keilmuan">Divisi Keilmuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Jabatan</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Anggota / Ketua Divisi / dll"
                      required
                    />
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

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari anggota (nama, NIM, divisi)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        {/* Members List */}
        <div className="space-y-3">
          {filteredMembers.length === 0 ? (
            <Card className="p-8 text-center bg-white">
              <p className="text-gray-500">Tidak ada anggota ditemukan</p>
            </Card>
          ) : (
            filteredMembers.map((member) => (
              <Card key={member.id} className="p-4 border-0 shadow-sm bg-white">
                <div className="flex gap-4">
                  <Avatar className="w-14 h-14 flex-shrink-0 bg-[#1565C0] text-white flex items-center justify-center font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#0A1D37] truncate">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          NIM: {member.nim} • Angkatan {member.angkatan}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={member.status === 'aktif' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-red-100 text-red-700 border-red-200'}
                      >
                        {member.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <Badge 
                        variant="outline" 
                        className={getDivisionColor(member.division)}
                      >
                        {member.division}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100 text-gray-700">
                        {member.position}
                      </Badge>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                    </div>

                    {canManage && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(member.id)}
                          className="flex-1"
                        >
                          {member.status === 'aktif' ? (
                            <>
                              <UserX className="w-4 h-4 mr-2" />
                              Nonaktifkan
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Aktifkan
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-3"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          className="px-3 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
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
