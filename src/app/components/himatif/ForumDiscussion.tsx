import { useState } from 'react';
import { Send, Users, Hash } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Avatar } from '@/app/components/ui/avatar';
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

  return (
    <div className="pb-20 bg-[#F4F6F8] h-screen flex flex-col">
      <div className="px-4 pt-4 pb-3 bg-white border-b">
        <h2 className="text-xl font-bold text-[#0A1D37] mb-3">Forum Diskusi</h2>
        
        {/* Channel List */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap flex-shrink-0 transition-colors ${
                activeChannel === channel.id
                  ? 'bg-[#1565C0] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {channel.type === 'all' ? (
                <Users className="w-4 h-4" />
              ) : (
                <Hash className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{channel.name}</span>
              {channel.unread > 0 && (
                <Badge className={`text-xs px-1.5 py-0 ${
                  activeChannel === channel.id
                    ? 'bg-white text-[#1565C0]'
                    : 'bg-[#1565C0] text-white'
                }`}>
                  {channel.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => {
          const isOwnMessage = msg.author === userName;
          
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="w-10 h-10 flex-shrink-0 bg-[#1565C0] text-white flex items-center justify-center font-semibold text-sm">
                {msg.avatar}
              </Avatar>
              <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-sm font-medium text-[#0A1D37] ${isOwnMessage ? 'order-2' : ''}`}>
                    {msg.author}
                  </span>
                  <span className={`text-xs text-gray-500 ${isOwnMessage ? 'order-1' : ''}`}>
                    {msg.time}
                  </span>
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
                    isOwnMessage
                      ? 'bg-[#1565C0] text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tulis pesan..."
            className="flex-1 bg-[#F4F6F8]"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-[#1565C0] hover:bg-[#0A1D37]"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
