import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { UserRole, FinancialTransaction } from '@/types';
import { mockTransactions, mockActivities } from '@/data/mockData';

interface FinanceProps {
  userRole: UserRole;
  userName: string;
}

export function Finance({ userRole, userName }: FinanceProps) {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(mockTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'pemasukan' as 'pemasukan' | 'pengeluaran',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    activityId: '',
  });

  const canManage = userRole === 'bendahara' || userRole === 'admin';

  const totalIncome = transactions
    .filter(t => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: FinancialTransaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
      activityId: formData.activityId || undefined,
      createdBy: userName,
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: 'pemasukan',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      activityId: '',
    });
    setIsDialogOpen(false);
  };

  const getActivityName = (activityId?: string) => {
    if (!activityId) return null;
    const activity = mockActivities.find(a => a.id === activityId);
    return activity?.title;
  };

  const incomeTransactions = transactions.filter(t => t.type === 'pemasukan');
  const expenseTransactions = transactions.filter(t => t.type === 'pengeluaran');

  const TransactionCard = ({ transaction }: { transaction: FinancialTransaction }) => (
    <Card className="p-4 border-0 shadow-sm bg-white">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          transaction.type === 'pemasukan' 
            ? 'bg-green-100' 
            : 'bg-red-100'
        }`}>
          {transaction.type === 'pemasukan' ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#0A1D37]">
                {transaction.description}
              </h4>
              {transaction.activityId && (
                <p className="text-xs text-gray-500 mt-1">
                  Terkait: {getActivityName(transaction.activityId)}
                </p>
              )}
            </div>
            <p className={`font-bold text-lg flex-shrink-0 ${
              transaction.type === 'pemasukan' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'pemasukan' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              <Calendar className="w-3 h-3 inline mr-1" />
              {formatDate(transaction.date)}
            </p>
            <p className="text-xs text-gray-500">
              Oleh: {transaction.createdBy}
            </p>
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
            <h2 className="text-xl font-bold text-[#0A1D37]">Keuangan</h2>
            <p className="text-sm text-gray-600">Transparansi keuangan HIMATIF</p>
          </div>
          {canManage && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#1565C0] hover:bg-[#0A1D37]">
                  <Plus className="w-4 h-4 mr-2" />
                  Transaksi
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Tambah Transaksi</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Jenis Transaksi</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: 'pemasukan' | 'pengeluaran') => 
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pemasukan">Pemasukan</SelectItem>
                        <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah (Rp)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Keterangan</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Deskripsi transaksi..."
                      rows={3}
                      required
                    />
                  </div>
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
                    <Label htmlFor="activity">Terkait Kegiatan (Opsional)</Label>
                    <Select
                      value={formData.activityId}
                      onValueChange={(value) => setFormData({ ...formData, activityId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kegiatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tidak terkait kegiatan</SelectItem>
                        {mockActivities.map(activity => (
                          <SelectItem key={activity.id} value={activity.id}>
                            {activity.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <Card className="p-5 border-0 shadow-md bg-gradient-to-br from-[#0A1D37] to-[#1565C0] text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Saldo Kas Saat Ini</p>
                <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 border-0 shadow-sm bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Pemasukan</p>
                  <p className="font-bold text-[#0A1D37]">{formatCurrency(totalIncome)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-0 shadow-sm bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Pengeluaran</p>
                  <p className="font-bold text-[#0A1D37]">{formatCurrency(totalExpense)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all">
              Semua ({transactions.length})
            </TabsTrigger>
            <TabsTrigger value="income">
              Pemasukan ({incomeTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="expense">
              Pengeluaran ({expenseTransactions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="income" className="space-y-3 mt-4">
            {incomeTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
            {incomeTransactions.length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Belum ada pemasukan</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="expense" className="space-y-3 mt-4">
            {expenseTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
            {expenseTransactions.length === 0 && (
              <Card className="p-8 text-center bg-white">
                <p className="text-gray-500">Belum ada pengeluaran</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
