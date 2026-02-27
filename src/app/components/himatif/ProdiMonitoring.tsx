import { Calendar, Users, Wallet, ClipboardList, TrendingUp, CheckCircle, FileText } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { mockActivities, mockMembers, mockTransactions, mockJobdesks } from '@/data/mockData';

export function ProdiMonitoring() {
  // Statistics
  const totalMembers = mockMembers.filter(m => m.status === 'aktif').length;
  
  const activitiesByStatus = {
    perencanaan: mockActivities.filter(a => a.status === 'perencanaan').length,
    pelaksanaan: mockActivities.filter(a => a.status === 'pelaksanaan').length,
    selesai: mockActivities.filter(a => a.status === 'selesai').length,
  };

  const totalIncome = mockTransactions
    .filter(t => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = mockTransactions
    .filter(t => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const jobdeskProgress = {
    total: mockJobdesks.length,
    completed: mockJobdesks.filter(j => j.status === 'selesai').length,
    inProgress: mockJobdesks.filter(j => j.status === 'dalam_proses').length,
    notStarted: mockJobdesks.filter(j => j.status === 'belum_dikerjakan').length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const completionRate = jobdeskProgress.total > 0 
    ? Math.round((jobdeskProgress.completed / jobdeskProgress.total) * 100)
    : 0;

  return (
    <div className="pb-20 bg-[#F4F6F8]">
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0A1D37]">Dashboard Monitoring Prodi</h2>
          <p className="text-sm text-gray-600">Monitoring aktivitas HIMATIF (Read-Only)</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 border-0 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#1565C0]" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Anggota Aktif</p>
                <p className="text-2xl font-bold text-[#0A1D37]">{totalMembers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-0 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Saldo Kas</p>
                <p className="text-lg font-bold text-[#0A1D37]">
                  {formatCurrency(balance).replace('Rp', '').trim().split(',')[0]}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Activities Status */}
        <Card className="p-5 border-0 shadow-sm bg-white mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#1565C0]" />
            <h3 className="font-semibold text-[#0A1D37]">Status Kegiatan</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-yellow-600">
                  {activitiesByStatus.perencanaan}
                </span>
              </div>
              <p className="text-xs text-gray-600">Perencanaan</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-blue-600">
                  {activitiesByStatus.pelaksanaan}
                </span>
              </div>
              <p className="text-xs text-gray-600">Pelaksanaan</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg font-bold text-green-600">
                  {activitiesByStatus.selesai}
                </span>
              </div>
              <p className="text-xs text-gray-600">Selesai</p>
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-5 border-0 shadow-sm bg-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1565C0]" />
              <h3 className="font-semibold text-[#0A1D37]">Kegiatan Terbaru</h3>
            </div>
          </div>

          <div className="space-y-3">
            {mockActivities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-[#1565C0] mt-2"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[#0A1D37] mb-1">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`text-xs ${
                        activity.status === 'selesai' ? 'bg-green-100 text-green-700' :
                        activity.status === 'pelaksanaan' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {activity.status === 'selesai' ? 'Selesai' :
                       activity.status === 'pelaksanaan' ? 'Berlangsung' :
                       'Perencanaan'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Financial Summary */}
        <Card className="p-5 border-0 shadow-sm bg-white mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-[#1565C0]" />
            <h3 className="font-semibold text-[#0A1D37]">Ringkasan Keuangan</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Total Pemasukan</span>
              </div>
              <span className="font-bold text-green-600">{formatCurrency(totalIncome)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                <span className="text-sm font-medium text-gray-700">Total Pengeluaran</span>
              </div>
              <span className="font-bold text-red-600">{formatCurrency(totalExpense)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#1565C0]/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#1565C0]" />
                <span className="text-sm font-medium text-gray-700">Saldo</span>
              </div>
              <span className="font-bold text-[#1565C0]">{formatCurrency(balance)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Transparansi keuangan HIMATIF periode Januari 2026
            </p>
          </div>
        </Card>

        {/* Jobdesk Progress */}
        <Card className="p-5 border-0 shadow-sm bg-white mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-[#1565C0]" />
            <h3 className="font-semibold text-[#0A1D37]">Progres Jobdesk Divisi</h3>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Penyelesaian</span>
              <span className="text-sm font-bold text-[#1565C0]">{completionRate}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1565C0] to-[#FBC02D] transition-all"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xl font-bold text-red-600">{jobdeskProgress.notStarted}</p>
              <p className="text-xs text-gray-600 mt-1">Belum</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-xl font-bold text-yellow-600">{jobdeskProgress.inProgress}</p>
              <p className="text-xs text-gray-600 mt-1">Proses</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">{jobdeskProgress.completed}</p>
              <p className="text-xs text-gray-600 mt-1">Selesai</p>
            </div>
          </div>
        </Card>

        {/* Documentation */}
        <Card className="p-5 border-0 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-[#1565C0]" />
            <h3 className="font-semibold text-[#0A1D37]">Dokumentasi Kegiatan</h3>
          </div>

          <div className="space-y-2">
            {mockActivities
              .filter(a => a.status === 'selesai')
              .slice(0, 3)
              .map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{activity.title}</span>
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {activity.documentation?.length || 0} foto
                  </Badge>
                </div>
              ))}
          </div>

          {mockActivities.filter(a => a.status === 'selesai').length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              Belum ada kegiatan dengan dokumentasi
            </p>
          )}
        </Card>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-semibold">Mode Read-Only:</span> Dashboard ini hanya untuk monitoring dan tidak dapat melakukan perubahan data.
          </p>
        </div>
      </div>
    </div>
  );
}
