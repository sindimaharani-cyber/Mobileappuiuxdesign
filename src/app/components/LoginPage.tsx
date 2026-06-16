import { useState } from 'react';
import { Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import { User } from '@/types';
import { mockUsers } from '@/data/mockData';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const QUICK_USERS = [
  { role: 'Admin', email: 'sindimaharani@student.uir.ac.id', initial: 'SM', color: '#1565C0' },
  { role: 'Bendahara', email: 'siti.rahma@student.uir.ac.id', initial: 'SR', color: '#7C3AED' },
  { role: 'Div. Head', email: 'budi.santoso@student.uir.ac.id', initial: 'BS', color: '#059669' },
  { role: 'Anggota', email: 'dewi.lestari@student.uir.ac.id', initial: 'DL', color: '#D97706' },
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 700));
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      onLogin(user);
    } else {
      setError('Email tidak ditemukan. Pilih akun demo di bawah.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060E1C 0%, #0A1D37 55%, #060E1C 100%)' }}>

      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #1565C0, transparent)' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #FBC02D, transparent)' }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-[22px] flex items-center justify-center mb-4 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #1565C0 0%, #0A1D37 100%)', border: '1.5px solid rgba(251,192,45,0.35)' }}>
            <ShieldCheck className="w-10 h-10" style={{ color: '#FBC02D' }} />
          </div>
          <h1 className="font-bold tracking-widest text-white" style={{ fontSize: '22px', letterSpacing: '0.12em' }}>E-ORGANISASI</h1>
          <p className="font-bold tracking-[0.2em] text-sm mt-0.5" style={{ color: '#FBC02D' }}>HIMATIF UIR</p>
          <p className="text-center mt-2" style={{ color: '#8899AA', fontSize: '11px', lineHeight: '1.6' }}>
            Sistem Informasi Himpunan Mahasiswa<br/>Teknik Informatika — Universitas Islam Riau
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 shadow-2xl" style={{ background: 'rgba(13,27,46,0.95)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)' }}>
          <p className="font-semibold mb-5" style={{ color: '#E8EDF5' }}>Masuk ke Akun</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label style={{ color: '#8899AA', fontSize: '11px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>EMAIL</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="nama@student.uir.ac.id" required
                style={{ width: '100%', borderRadius: '12px', padding: '12px 14px', fontSize: '13px', color: '#E8EDF5', background: '#112240', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '11px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  style={{ width: '100%', borderRadius: '12px', padding: '12px 42px 12px 14px', fontSize: '13px', color: '#E8EDF5', background: '#112240', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8899AA', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ borderRadius: '10px', padding: '10px 14px', fontSize: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#EF4444' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: '100%', borderRadius: '12px', padding: '13px', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', background: loading ? '#112240' : 'linear-gradient(135deg, #1565C0, #0D47A1)', color: '#fff', border: 'none', cursor: loading ? 'default' : 'pointer', fontFamily: 'Poppins, sans-serif' }}>
              {loading
                ? <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
                : <><LogIn size={16} /> Masuk</>}
            </button>
          </form>
        </div>

        {/* Quick login */}
        <div className="mt-5">
          <p className="text-center mb-3" style={{ color: '#8899AA', fontSize: '11px' }}>— Pilih Akun Demo —</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_USERS.map(u => (
              <button key={u.email} onClick={() => { setEmail(u.email); setPassword('password'); }}
                style={{ borderRadius: '12px', padding: '10px 12px', textAlign: 'left', background: 'rgba(13,27,46,0.85)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', background: u.color, flexShrink: 0 }}>
                    {u.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#E8EDF5', lineHeight: 1.3 }}>{u.role}</p>
                    <p style={{ fontSize: '10px', color: '#8899AA', lineHeight: 1.3 }}>Tap untuk isi</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center mt-6" style={{ color: '#8899AA', fontSize: '11px' }}>
          v1.0.0 · HIMATIF UIR © 2024 · Metode Scrum
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}