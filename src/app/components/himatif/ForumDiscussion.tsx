import { useState } from 'react';
import { Send, Users, Hash, AtSign } from 'lucide-react';
import { UserRole } from '@/types';

interface ForumDiscussionProps {
  userRole: UserRole;
  userName: string;
  userDivision?: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'all' | 'division';
  unread: number;
}

interface Message {
  id: string;
  author: string;
  content: string;
  time: string;
  avatar: string;
}

export function ForumDiscussion({ userRole, userName, userDivision }: ForumDiscussionProps) {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');

  const channels: Channel[] = [
    { id: 'general', name: 'General', type: 'all', unread: 3 },
    { id: 'pengumuman', name: 'Pengumuman', type: 'all', unread: 0 },
    { id: 'acara', name: 'Divisi Acara', type: 'division', unread: 5 },
    { id: 'humas', name: 'Divisi Humas', type: 'division', unread: 2 },
    { id: 'multimedia', name: 'Divisi Multimedia', type: 'division', unread: 0 },
    { id: 'keilmuan', name: 'Divisi Keilmuan', type: 'division', unread: 1 },
  ];

  const messages: Message[] = [
    {
      id: '1',
      author: 'Sindi Maharani',
      content: 'Selamat pagi semuanya! Jangan lupa rapat koordinasi hari ini jam 16.00 ya.',
      time: '08:30',
      avatar: 'SM'
    },
    {
      id: '2',
      author: 'Budi Santoso',
      content: 'Siap Ketua! Sudah siap semua materinya.',
      time: '08:35',
      avatar: 'BS'
    },
    {
      id: '3',
      author: 'Dewi Lestari',
      content: 'Untuk Workshop Flutter besok, perlengkapannya sudah ready semua. Tinggal setting venue aja.',
      time: '09:15',
      avatar: 'DL'
    },
    {
      id: '4',
      author: userName,
      content: 'Mantap! Semangat semuanya 🔥',
      time: '09:20',
      avatar: userName.split(' ').map(n => n[0]).join('').slice(0, 2)
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Logic to send message
      setMessage('');
    }
  };

  const AVATAR_COLORS: Record<string, string> = {
    'SM': '#1565C0', 'BS': '#059669', 'DL': '#D97706',
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#060E1C', paddingBottom: '80px' }}>
      {/* Channel header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0A1D37' }}>
        <h2 style={{ color: '#E8EDF5', fontWeight: 700, fontSize: '16px', marginBottom: '10px' }}>Forum Diskusi</h2>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '2px' }}>
          {channels.map(ch => {
            const isActive = activeChannel === ch.id;
            const Icon = ch.type === 'all' ? Users : Hash;
            return (
              <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '10px', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: isActive ? 700 : 400, background: isActive ? '#1565C0' : '#112240', color: isActive ? '#fff' : '#8899AA', border: 'none', transition: 'all 0.15s', position: 'relative' }}>
                <Icon size={13} />
                {ch.name}
                {ch.unread > 0 && (
                  <span style={{ background: isActive ? '#FBC02D' : '#EF4444', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '10px' }}>{ch.unread}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', scrollbarWidth: 'none' }}>
        {messages.map(msg => {
          const isOwn = msg.author === userName;
          const avatarColor = AVATAR_COLORS[msg.avatar] || '#7C3AED';
          return (
            <div key={msg.id} style={{ display: 'flex', gap: '10px', flexDirection: isOwn ? 'row-reverse' : 'row' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                {msg.avatar}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px', flexDirection: isOwn ? 'row-reverse' : 'row' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#E8EDF5' }}>{msg.author}</span>
                  <span style={{ fontSize: '10px', color: '#8899AA' }}>{msg.time}</span>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: isOwn ? '16px 4px 16px 16px' : '4px 16px 16px 16px', maxWidth: '80%', background: isOwn ? '#1565C0' : '#0D1B2E', border: isOwn ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: '13px', color: '#E8EDF5', lineHeight: 1.5, margin: 0 }}>{msg.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#0A1D37', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input value={message} onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Tulis pesan..."
          style={{ flex: 1, borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#E8EDF5', background: '#112240', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', fontFamily: 'Poppins, sans-serif' }} />
        <button onClick={handleSend} disabled={!message.trim()}
          style={{ width: '40px', height: '40px', borderRadius: '12px', background: message.trim() ? '#1565C0' : '#112240', border: 'none', cursor: message.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
          <Send size={16} style={{ color: message.trim() ? '#fff' : '#8899AA' }} />
        </button>
      </div>
    </div>
  );
}
