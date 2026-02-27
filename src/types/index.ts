export type UserRole = 'admin' | 'bendahara' | 'ketua_divisi' | 'anggota' | 'prodi';

export interface User {
  id: string;
  nim?: string;
  name: string;
  email: string;
  role: UserRole;
  division?: string;
  position?: string;
  angkatan?: string;
  status?: 'aktif' | 'tidak_aktif';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  archived: boolean;
}

export type ActivityStatus = 'perencanaan' | 'pelaksanaan' | 'selesai';

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: ActivityStatus;
  documentation?: string[];
  reminder?: boolean;
}

export interface FinancialTransaction {
  id: string;
  type: 'pemasukan' | 'pengeluaran';
  amount: number;
  description: string;
  date: string;
  activityId?: string;
  createdBy: string;
}

export type JobdeskStatus = 'belum_dikerjakan' | 'dalam_proses' | 'selesai';

export interface Jobdesk {
  id: string;
  division: string;
  title: string;
  description: string;
  status: JobdeskStatus;
  assignedTo?: string[];
  dueDate?: string;
  createdBy: string;
}

export interface Member {
  id: string;
  nim: string;
  name: string;
  angkatan: string;
  division: string;
  position: string;
  status: 'aktif' | 'tidak_aktif';
  email: string;
  phone: string;
}
