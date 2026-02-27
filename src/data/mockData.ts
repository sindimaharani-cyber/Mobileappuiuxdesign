import { User, Announcement, Activity, FinancialTransaction, Jobdesk, Member } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    nim: '2021001',
    name: 'Sindi Maharani',
    email: 'sindimaharani@student.uir.ac.id',
    role: 'admin',
    division: 'Inti',
    position: 'Ketua HIMATIF',
    angkatan: '2021',
    status: 'aktif'
  },
  {
    id: '2',
    nim: '2021002',
    name: 'Siti Rahma',
    email: 'siti.rahma@student.uir.ac.id',
    role: 'bendahara',
    division: 'Inti',
    position: 'Bendahara',
    angkatan: '2021',
    status: 'aktif'
  },
  {
    id: '3',
    nim: '2022001',
    name: 'Budi Santoso',
    email: 'budi.santoso@student.uir.ac.id',
    role: 'ketua_divisi',
    division: 'Divisi Acara',
    position: 'Ketua Divisi Acara',
    angkatan: '2022',
    status: 'aktif'
  },
  {
    id: '4',
    nim: '2023001',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@student.uir.ac.id',
    role: 'anggota',
    division: 'Divisi Acara',
    position: 'Anggota',
    angkatan: '2023',
    status: 'aktif'
  },
  {
    id: '5',
    name: 'Dr. Muhammad Yusuf, M.Kom',
    email: 'prodi@uir.ac.id',
    role: 'prodi',
    position: 'Ketua Prodi Teknik Informatika'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Rapat Koordinasi Pengurus HIMATIF',
    content: 'Mengundang seluruh pengurus HIMATIF untuk hadir dalam rapat koordinasi yang akan membahas agenda kegiatan semester genap 2026.',
    category: 'Rapat',
    date: '2026-01-28T10:00:00',
    author: 'Sindi Maharani',
    archived: false
  },
  {
    id: '2',
    title: 'Pendaftaran Seminar Teknologi Terkini',
    content: 'Dibuka pendaftaran seminar teknologi dengan tema "AI & Machine Learning in Practice". Terbatas untuk 100 peserta.',
    category: 'Acara',
    date: '2026-01-29T14:00:00',
    author: 'Budi Santoso',
    archived: false
  },
  {
    id: '3',
    title: 'Laporan Keuangan Bulan Januari 2026',
    content: 'Telah tersedia laporan keuangan HIMATIF periode Januari 2026. Silakan cek di menu Keuangan.',
    category: 'Keuangan',
    date: '2026-01-30T09:00:00',
    author: 'Siti Rahma',
    archived: false
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Workshop Flutter Development',
    description: 'Workshop pengembangan aplikasi mobile menggunakan Flutter untuk mahasiswa Teknik Informatika.',
    date: '2026-02-10',
    time: '09:00 - 15:00 WIB',
    location: 'Lab Komputer 1',
    status: 'perencanaan',
    reminder: true
  },
  {
    id: '2',
    title: 'Seminar AI & Machine Learning',
    description: 'Seminar tentang penerapan AI dan Machine Learning dalam industri teknologi.',
    date: '2026-02-15',
    time: '13:00 - 17:00 WIB',
    location: 'Auditorium Kampus',
    status: 'perencanaan',
    reminder: true
  },
  {
    id: '3',
    title: 'Bakti Sosial HIMATIF',
    description: 'Kegiatan bakti sosial ke panti asuhan sebagai bentuk kepedulian sosial mahasiswa.',
    date: '2026-01-25',
    time: '08:00 - 14:00 WIB',
    location: 'Panti Asuhan Al-Hikmah',
    status: 'pelaksanaan'
  },
  {
    id: '4',
    title: 'Turnamen E-Sport HIMATIF Cup',
    description: 'Turnamen e-sport antar angkatan untuk mempererat kebersamaan.',
    date: '2026-01-20',
    time: '10:00 - 18:00 WIB',
    location: 'Gedung Serbaguna',
    status: 'selesai',
    documentation: ['doc1.jpg', 'doc2.jpg', 'doc3.jpg']
  }
];

export const mockTransactions: FinancialTransaction[] = [
  {
    id: '1',
    type: 'pemasukan',
    amount: 5000000,
    description: 'Dana Sponsor Seminar AI',
    date: '2026-01-15',
    activityId: '2',
    createdBy: 'Siti Rahma'
  },
  {
    id: '2',
    type: 'pengeluaran',
    amount: 2500000,
    description: 'Biaya Sewa Venue Workshop Flutter',
    date: '2026-01-18',
    activityId: '1',
    createdBy: 'Siti Rahma'
  },
  {
    id: '3',
    type: 'pemasukan',
    amount: 3000000,
    description: 'Iuran Anggota Semester Genap',
    date: '2026-01-20',
    createdBy: 'Siti Rahma'
  },
  {
    id: '4',
    type: 'pengeluaran',
    amount: 1500000,
    description: 'Pembelian Konsumsi Bakti Sosial',
    date: '2026-01-22',
    activityId: '3',
    createdBy: 'Siti Rahma'
  }
];

export const mockJobdesks: Jobdesk[] = [
  {
    id: '1',
    division: 'Divisi Acara',
    title: 'Persiapan Workshop Flutter',
    description: 'Menyiapkan materi, narasumber, dan perlengkapan untuk workshop Flutter.',
    status: 'dalam_proses',
    assignedTo: ['Budi Santoso', 'Dewi Lestari'],
    dueDate: '2026-02-08',
    createdBy: 'Sindi Maharani'
  },
  {
    id: '2',
    division: 'Divisi Humas',
    title: 'Publikasi Seminar AI',
    description: 'Membuat dan menyebarkan poster serta mengatur publikasi di media sosial.',
    status: 'selesai',
    assignedTo: ['Rina Marlina'],
    dueDate: '2026-01-25',
    createdBy: 'Sindi Maharani'
  },
  {
    id: '3',
    division: 'Divisi Multimedia',
    title: 'Dokumentasi Kegiatan Bakti Sosial',
    description: 'Mendokumentasikan seluruh rangkaian kegiatan bakti sosial dalam bentuk foto dan video.',
    status: 'dalam_proses',
    assignedTo: ['Eko Prasetyo'],
    dueDate: '2026-01-25',
    createdBy: 'Sindi Maharani'
  },
  {
    id: '4',
    division: 'Divisi Acara',
    title: 'Evaluasi Turnamen E-Sport',
    description: 'Membuat laporan evaluasi pelaksanaan turnamen e-sport.',
    status: 'belum_dikerjakan',
    assignedTo: ['Budi Santoso'],
    dueDate: '2026-02-05',
    createdBy: 'Sindi Maharani'
  }
];

export const mockMembers: Member[] = [
  {
    id: '1',
    nim: '2021001',
    name: 'Sindi Maharani',
    angkatan: '2021',
    division: 'Pengurus Inti',
    position: 'Ketua',
    status: 'aktif',
    email: 'sindimaharani@student.uir.ac.id',
    phone: '081234567890'
  },
  {
    id: '2',
    nim: '2021002',
    name: 'Siti Rahma',
    angkatan: '2021',
    division: 'Pengurus Inti',
    position: 'Bendahara',
    status: 'aktif',
    email: 'siti.rahma@student.uir.ac.id',
    phone: '081234567891'
  },
  {
    id: '3',
    nim: '2022001',
    name: 'Budi Santoso',
    angkatan: '2022',
    division: 'Divisi Acara',
    position: 'Ketua Divisi',
    status: 'aktif',
    email: 'budi.santoso@student.uir.ac.id',
    phone: '081234567892'
  },
  {
    id: '4',
    nim: '2023001',
    name: 'Dewi Lestari',
    angkatan: '2023',
    division: 'Divisi Acara',
    position: 'Anggota',
    status: 'aktif',
    email: 'dewi.lestari@student.uir.ac.id',
    phone: '081234567893'
  },
  {
    id: '5',
    nim: '2022002',
    name: 'Rina Marlina',
    angkatan: '2022',
    division: 'Divisi Humas',
    position: 'Ketua Divisi',
    status: 'aktif',
    email: 'rina.marlina@student.uir.ac.id',
    phone: '081234567894'
  },
  {
    id: '6',
    nim: '2023002',
    name: 'Eko Prasetyo',
    angkatan: '2023',
    division: 'Divisi Multimedia',
    position: 'Anggota',
    status: 'aktif',
    email: 'eko.prasetyo@student.uir.ac.id',
    phone: '081234567895'
  }
];