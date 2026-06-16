import { useState } from 'react';
import { Home, Calendar, MessageSquare, Wallet, Menu } from 'lucide-react';
import { LoginPage } from '@/app/components/LoginPage';
import { Header } from '@/app/components/himatif/Header';
import { NavigationDrawer } from '@/app/components/himatif/NavigationDrawer';
import { Dashboard } from '@/app/components/himatif/Dashboard';
import { Announcements } from '@/app/components/himatif/Announcements';
import { Activities } from '@/app/components/himatif/Activities';
import { Members } from '@/app/components/himatif/Members';
import { Finance } from '@/app/components/himatif/Finance';
import { JobdeskManagement } from '@/app/components/himatif/Jobdesk';
import { ProdiMonitoring } from '@/app/components/himatif/ProdiMonitoring';
import { Notifications } from '@/app/components/himatif/Notifications';
import { ForumDiscussion } from '@/app/components/himatif/ForumDiscussion';
import { CalendarView } from '@/app/components/himatif/CalendarView';
import { EventRegistration } from '@/app/components/himatif/EventRegistration';
import { Certificates } from '@/app/components/himatif/Certificates';
import { OrganizationStructure } from '@/app/components/himatif/OrganizationStructure';
import { Recruitment } from '@/app/components/himatif/Recruitment';
import { Documentation } from '@/app/components/himatif/Documentation';
import { LetterManagement } from '@/app/components/himatif/LetterManagement';
import { SprintBoard } from '@/app/components/himatif/SprintBoard';
import { User, UserRole } from '@/types';

const BOTTOM_NAV = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'activities', icon: Calendar, label: 'Kegiatan' },
  { id: 'forum', icon: MessageSquare, label: 'Forum' },
  { id: 'finance', icon: Wallet, label: 'Keuangan' },
  { id: '__menu', icon: Menu, label: 'Menu' },
];

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (user: User) => { setCurrentUser(user); setActiveTab('dashboard'); };
  const handleLogout = () => {
    if (confirm('Yakin ingin keluar dari HIMATIF UIR?')) { setCurrentUser(null); setActiveTab('dashboard'); }
  };

  if (!currentUser) return <LoginPage onLogin={handleLogin} />;

  const renderContent = () => {
    const r = currentUser.role as UserRole;
    switch (activeTab) {
      case 'dashboard': return <Dashboard userRole={r} userName={currentUser.name} />;
      case 'announcements': return <Announcements userRole={r} userName={currentUser.name} />;
      case 'notifications': return <Notifications userRole={r} />;
      case 'forum': return <ForumDiscussion userRole={r} userName={currentUser.name} userDivision={currentUser.division} />;
      case 'activities': return <Activities userRole={r} userName={currentUser.name} />;
      case 'calendar': return <CalendarView userRole={r} />;
      case 'registration': return <EventRegistration userRole={r} userName={currentUser.name} />;
      case 'certificates': return <Certificates userName={currentUser.name} />;
      case 'members': return <Members userRole={r} />;
      case 'organization': return <OrganizationStructure />;
      case 'recruitment': return <Recruitment userRole={r} />;
      case 'finance': return <Finance userRole={r} userName={currentUser.name} />;
      case 'jobdesk': return <JobdeskManagement userRole={r} userName={currentUser.name} userDivision={currentUser.division} />;
      case 'sprint': return <SprintBoard userRole={r} />;
      case 'documentation': return <Documentation userRole={r} />;
      case 'letters': return <LetterManagement userRole={r} />;
      case 'monitoring': return <ProdiMonitoring />;
      default: return <Dashboard userRole={r} userName={currentUser.name} />;
    }
  };

  const handleBottomNav = (id: string) => {
    if (id === '__menu') { setIsDrawerOpen(true); return; }
    setActiveTab(id);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060E1C', fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-lg mx-auto relative" style={{ minHeight: '100vh' }}>
        <Header
          user={currentUser}
          onMenuClick={() => setIsDrawerOpen(true)}
          onLogout={handleLogout}
          onNotifClick={() => setActiveTab('notifications')}
          notifCount={3}
        />

        <NavigationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeTab={activeTab}
          onTabChange={tab => { setActiveTab(tab); setIsDrawerOpen(false); }}
          userName={currentUser.name}
          userRole={currentUser.role as UserRole}
          userDivision={currentUser.division}
        />

        <main style={{ minHeight: 'calc(100vh - 56px)' }}>
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto z-30"
          style={{ background: '#0A1D37', borderTop: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <div className="flex items-center justify-around px-2 py-2">
            {BOTTOM_NAV.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => handleBottomNav(item.id)}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '8px 4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', borderRadius: '12px', transition: 'all 0.15s', position: 'relative' }}>
                  {isActive && item.id !== '__menu' && (
                    <span style={{ position: 'absolute', top: '2px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '2.5px', borderRadius: '2px', background: '#FBC02D' }} />
                  )}
                  <Icon size={22} style={{ color: isActive && item.id !== '__menu' ? '#FBC02D' : 'rgba(255,255,255,0.5)', transition: 'color 0.15s' }} />
                  <span style={{ fontSize: '9px', fontWeight: isActive && item.id !== '__menu' ? 700 : 400, color: isActive && item.id !== '__menu' ? '#FBC02D' : 'rgba(255,255,255,0.45)', lineHeight: 1 }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}