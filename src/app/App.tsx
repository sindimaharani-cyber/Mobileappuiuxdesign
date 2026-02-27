import { useState } from 'react';
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
import { User } from '@/types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    if (confirm('Yakin ingin keluar?')) {
      setCurrentUser(null);
      setActiveTab('dashboard');
    }
  };

  // Show login page if not authenticated
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={currentUser.role} userName={currentUser.name} />;
      case 'announcements':
        return <Announcements userRole={currentUser.role} userName={currentUser.name} />;
      case 'notifications':
        return <Notifications userRole={currentUser.role} />;
      case 'forum':
        return <ForumDiscussion userRole={currentUser.role} userName={currentUser.name} userDivision={currentUser.division} />;
      case 'activities':
        return <Activities userRole={currentUser.role} userName={currentUser.name} />;
      case 'calendar':
        return <CalendarView userRole={currentUser.role} />;
      case 'registration':
        return <EventRegistration userRole={currentUser.role} userName={currentUser.name} />;
      case 'certificates':
        return <Certificates userName={currentUser.name} />;
      case 'members':
        return <Members userRole={currentUser.role} />;
      case 'organization':
        return <OrganizationStructure />;
      case 'recruitment':
        return <Recruitment userRole={currentUser.role} />;
      case 'finance':
        return <Finance userRole={currentUser.role} userName={currentUser.name} />;
      case 'jobdesk':
        return (
          <JobdeskManagement 
            userRole={currentUser.role} 
            userName={currentUser.name}
            userDivision={currentUser.division}
          />
        );
      case 'documentation':
        return <Documentation userRole={currentUser.role} />;
      case 'letters':
        return <LetterManagement userRole={currentUser.role} />;
      case 'monitoring':
        return <ProdiMonitoring />;
      default:
        return <Dashboard userRole={currentUser.role} userName={currentUser.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Header 
        user={currentUser} 
        onMenuClick={() => setIsDrawerOpen(true)}
        onLogout={handleLogout}
      />
      
      <NavigationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName={currentUser.name}
        userRole={currentUser.role}
        userPosition={currentUser.position}
      />

      <main className="max-w-md mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}