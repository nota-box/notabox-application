import React from 'react';
import { Settings, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import IconButton from '../common/IconButton';
import UploadButton from './UploadButton';
import UserMenu from './UserMenu';
import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onUploadClick: () => void;
  onAuthClick: () => void;
  onDocsClick: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onThemeToggle,
  onUploadClick,
  onAuthClick,
  onDocsClick,
  onSettingsClick,
}) => {
  const { user } = useAuthStore();

  return (
    <div className={`fixed top-0 right-0 left-0 z-50 ${
      isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
    } backdrop-blur-md transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          NotaBox
        </h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
          <IconButton
            icon={FileText}
            label="Documentation"
            onClick={onDocsClick}
          />
          <IconButton
            icon={Settings}
            label="Settings"
            onClick={onSettingsClick}
          />
          <UploadButton onClick={onUploadClick} />
          {user ? (
            <UserMenu isDarkMode={isDarkMode} />
          ) : (
            <button
              onClick={onAuthClick}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;