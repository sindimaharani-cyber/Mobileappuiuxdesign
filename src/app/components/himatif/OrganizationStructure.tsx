import { useState } from 'react';
import { Mail, Phone, MessageCircle, Search } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Avatar } from '@/app/components/ui/avatar';

interface OrganizationStructure {
  level: string;
  members: OrgMember[];
}

interface OrgMember {
  id: string;
  name: string;
  position: string;
  division?: string;
  email: string;
  phone: string;
  photo: string;
}

export function OrganizationStructure() {
  const [searchQuery, setSearchQuery] = useState('');

  const structure: OrganizationStructure[] = [
    {
      level: 'Pengurus Inti',
      members: [
        {
          id: '1',
          name: 'Sindi Maharani',
          position: 'Ketua HIMATIF',
          email: 'sindimaharani@student.uir.ac.id',
          phone: '081234567890',
          photo: 'SM'
        },
        {
          id: '2',
          name: 'Siti Rahma',
          position: 'Bendahara',
          email: 'siti.rahma@student.uir.ac.id',
          phone: '081234567891',
          photo: 'SR'
        },
        {
          id: '3',
          name: 'Ahmad Rizki',
          position: 'Sekretaris',
          email: 'ahmad.rizki@student.uir.ac.id',
          phone: '081234567892',
          photo: 'AR'
        }
      ]
    },
    {
      level: 'Ketua Divisi',
      members: [
        {
          id: '4',
          name: 'Budi Santoso',
          position: 'Ketua Divisi',
          division: 'Divisi Acara',
          email: 'budi.santoso@student.uir.ac.id',
          phone: '081234567893',
          photo: 'BS'
        },
        {
          id: '5',
          name: 'Rina Marlina',
          position: 'Ketua Divisi',
          division: 'Divisi Humas',
          email: 'rina.marlina@student.uir.ac.id',
          phone: '081234567894',
          photo: 'RM'
        },
        {
          id: '6',
          name: 'Andi Pratama',
          position: 'Ketua Divisi',
          division: 'Divisi Multimedia',
          email: 'andi.pratama@student.uir.ac.id',
          phone: '081234567895',
          photo: 'AP'
        },
        {
          id: '7',
          name: 'Lisa Wijaya',
          position: 'Ketua Divisi',
          division: 'Divisi Keilmuan',
          email: 'lisa.wijaya@student.uir.ac.id',
          phone: '081234567896',
          photo: 'LW'
        }
      ]
    }
  ];

  const filteredStructure = structure.map(level => ({
    ...level,
    members: level.members.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.division && member.division.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(level => level.members.length > 0);

  const handleContact = (type: 'email' | 'phone' | 'wa', value: string) => {
    if (type === 'email') {
      window.location.href = `mailto:${value}`;
    } else if (type === 'phone') {
      window.location.href = `tel:${value}`;
    } else if (type === 'wa') {
      window.open(`https://wa.me/${value.replace(/\D/g, '')}`, '_blank');
    }
  };

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0A1D37]">Struktur Organisasi</h2>
          <p className="text-sm text-gray-600">Pengurus HIMATIF UIR 2025/2026</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari pengurus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>

        {/* Organization Chart */}
        {filteredStructure.map((level, levelIndex) => (
          <div key={levelIndex} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-[#1565C0] to-transparent"></div>
              <h3 className="font-semibold text-[#0A1D37] px-3 py-1 bg-[#1565C0] text-white rounded-full text-sm">
                {level.level}
              </h3>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-[#1565C0] to-transparent"></div>
            </div>

            <div className="space-y-3">
              {level.members.map((member) => (
                <Card key={member.id} className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-[#1565C0] to-[#FBC02D] text-white flex items-center justify-center font-bold text-lg">
                      {member.photo}
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#0A1D37] mb-1">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {member.position}
                      </p>
                      {member.division && (
                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                          {member.division}
                        </Badge>
                      )}

                      <div className="flex gap-2 mt-3">
                        <Button
                          onClick={() => handleContact('email', member.email)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-[#1565C0] border-[#1565C0]"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button
                          onClick={() => handleContact('phone', member.phone)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-[#1565C0] border-[#1565C0]"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Telp
                        </Button>
                        <Button
                          onClick={() => handleContact('wa', member.phone)}
                          variant="outline"
                          size="sm"
                          className="px-3 text-green-600 border-green-600"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredStructure.length === 0 && (
          <Card className="p-12 text-center bg-white">
            <p className="text-gray-500">Tidak ada hasil pencarian</p>
          </Card>
        )}
      </div>
    </div>
  );
}
