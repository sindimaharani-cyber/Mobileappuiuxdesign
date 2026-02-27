import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { User } from '@/types';
import { mockUsers } from '@/data/mockData';
import { GraduationCap, Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulasi login
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Email atau password salah');
    }
  };

  // Contoh kredensial untuk testing
  const exampleCredentials = [
    { role: 'Admin/Ketua', email: 'sindimaharani@student.uir.ac.id' },
    { role: 'Bendahara', email: 'siti.rahma@student.uir.ac.id' },
    { role: 'Ketua Divisi', email: 'budi.santoso@student.uir.ac.id' },
    { role: 'Anggota', email: 'dewi.lestari@student.uir.ac.id' },
    { role: 'Prodi', email: 'prodi@uir.ac.id' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1D37] via-[#1565C0] to-[#0A1D37] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FBC02D] rounded-full mb-4">
            <GraduationCap className="w-10 h-10 text-[#0A1D37]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">HIMATIF UIR</h1>
          <p className="text-white/80">Himpunan Mahasiswa Teknik Informatika</p>
          <p className="text-white/60 text-sm mt-1">Universitas Islam Riau</p>
        </div>

        {/* Login Card */}
        <Card className="p-6 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0A1D37]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@student.uir.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#F4F6F8] border-gray-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0A1D37]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-[#F4F6F8] border-gray-200"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-[#1565C0] hover:bg-[#0A1D37] text-white">
              Masuk
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Contoh Email Login:</p>
            <div className="space-y-2">
              {exampleCredentials.map((cred, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setEmail(cred.email)}
                  className="w-full text-left px-3 py-2 bg-[#F4F6F8] hover:bg-[#1565C0]/10 rounded-lg text-xs transition-colors"
                >
                  <span className="font-medium text-[#0A1D37]">{cred.role}:</span>{' '}
                  <span className="text-gray-600">{cred.email}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Password: bebas (untuk demo)
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          © 2026 HIMATIF UIR - Metode Scrum
        </p>
      </div>
    </div>
  );
}