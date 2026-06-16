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
  const [activeFilter, setActiveFilter] = useState('all');
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

  const TransactionCard = ({ transaction }: { transaction: FinancialTransaction }) => {
    const isIncome = transaction.type === 'pemasukan';
    return (
      <div style={{ borderRadius: '16px', padding: '14px', background: '#0D1B2E', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: isIncome ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)' }}>
          {isIncome ? <TrendingUp size={18} style={{ color: '#34D399' }} /> : <TrendingDown size={18} style={{ color: '#EF4444' }} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'flex-start', marginBottom: '4px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#E8EDF5', flex: 1 }}>{transaction.description}</p>
            <p style={{ fontSize: '14px', fontWeight: 700, color: isIncome ? '#34D399' : '#EF4444', flexShrink: 0 }}>
              {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
          </div>
          {transaction.activityId && (
            <p style={{ fontSize: '11px', color: '#60A5FA', marginBottom: '2px' }}>📎 {getActivityName(transaction.activityId)}</p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '11px', color: '#8899AA' }}>📅 {formatDate(transaction.date)}</p>
            <p style={{ fontSize: '11px', color: '#8899AA' }}>Oleh: {transaction.createdBy}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24 min-h-screen" style={{ background: '#060E1C' }}>
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Keuangan</h2>
            <p className="text-sm text-muted-foreground">Transparansi keuangan HIMATIF</p>
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

        {/* Balance card */}
        <div style={{ borderRadius: '20px', padding: '20px', marginBottom: '16px', background: 'linear-gradient(135deg, #0A1D37 0%, #1565C0 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(251,192,45,0.1)' }} />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginBottom: '6px' }}>Saldo Kas HIMATIF</p>
          <p style={{ color: '#fff', fontWeight: 800, fontSize: '28px', marginBottom: '16px' }}>{formatCurrency(balance)}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Pemasukan', value: totalIncome, icon: <TrendingUp size={14} />, color: '#34D399' },
              { label: 'Pengeluaran', value: totalExpense, icon: <TrendingDown size={14} />, color: '#EF4444' },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px', color: item.color }}>
                  {item.icon}
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{item.label}</span>
                </div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>{formatCurrency(item.value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        {(() => {
          const filtered = activeFilter === 'all' ? transactions : transactions.filter(t => t.type === (activeFilter === 'income' ? 'pemasukan' : 'pengeluaran'));
          return (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                {[{ id:'all', label:`Semua (${transactions.length})` }, { id:'income', label:`Masuk (${incomeTransactions.length})` }, { id:'expense', label:`Keluar (${expenseTransactions.length})` }].map(tab => (
                  <button key={tab.id} onClick={() => setActiveFilter(tab.id)}
                    style={{ flex: 1, padding: '8px 4px', borderRadius: '10px', fontSize: '11px', fontWeight: activeFilter === tab.id ? 700 : 400, background: activeFilter === tab.id ? '#1565C0' : '#0D1B2E', color: activeFilter === tab.id ? '#fff' : '#8899AA', border: activeFilter === tab.id ? 'none' : '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filtered.map(t => <TransactionCard key={t.id} transaction={t} />)}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
