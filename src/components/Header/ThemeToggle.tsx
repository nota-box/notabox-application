import React from 'react';
import { Moon, Sun } from 'lucide-react';
import IconButton from '../common/IconButton';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <IconButton
      icon={isDarkMode ? Moon : Sun}
      label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      onClick={onToggle}
    />
  );
};

export default ThemeToggle;