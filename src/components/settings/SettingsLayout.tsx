import React from 'react';
import { 
  Palette, 
  Bell, 
  User, 
  Shield, 
  Database, 
  Share2,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import GeneralSettings from './sections/GeneralSettings';
import NotificationSettings from './sections/NotificationSettings';
import ProfileSettings from './sections/ProfileSettings';
import SecuritySettings from './sections/SecuritySettings';
import StorageSettings from './sections/StorageSettings';
import SharingSettings from './sections/SharingSettings';

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.ComponentType<{ isDarkMode: boolean }>;
  requiresAuth?: boolean;
}

const sections: Section[] = [
  {
    id: 'general',
    title: 'General',
    icon: Palette,
    component: GeneralSettings
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    component: NotificationSettings,
    requiresAuth: true
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: User,
    component: ProfileSettings,
    requiresAuth: true
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    component: SecuritySettings,
    requiresAuth: true
  },
  {
    id: 'storage',
    title: 'Storage',
    icon: Database,
    component: StorageSettings,
    requiresAuth: true
  },
  {
    id: 'sharing',
    title: 'Sharing',
    icon: Share2,
    component: SharingSettings,
    requiresAuth: true
  }
];

interface SettingsLayoutProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ isDarkMode, onClose }) => {
  const [activeSection, setActiveSection] = React.useState(sections[0].id);
  const { user } = useAuthStore();

  const availableSections = sections.filter(section => 
    !section.requiresAuth || (section.requiresAuth && user)
  );
  
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || GeneralSettings;

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className={`sticky top-28 rounded-xl overflow-hidden ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-md shadow-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Settings</h2>
                <button
                  onClick={onClose}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  Done
                </button>
              </div>
              <nav className="space-y-1">
                {availableSections.map(section => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left
                        transition-colors duration-200 ${
                        activeSection === section.id
                          ? 'bg-purple-500 text-white'
                          : `hover:bg-gray-100/10`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 ${
                        activeSection === section.id ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className={`rounded-xl ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-md shadow-lg p-8`}>
              <ActiveComponent isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;