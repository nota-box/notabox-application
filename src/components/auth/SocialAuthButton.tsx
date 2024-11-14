import React from 'react';
import { Loader2 } from 'lucide-react';

interface SocialAuthButtonProps {
  provider: 'Google' | 'Apple';
  onClick: () => Promise<void>;
  disabled: boolean;
  isDarkMode: boolean;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onClick,
  disabled,
  isDarkMode,
}) => {
  const getProviderLogo = () => {
    switch (provider) {
      case 'Google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        );
      case 'Apple':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.2 0-1.44.71-2.23.51-3.11-.41C3.21 15.64 4.05 7.5 9.08 7.18c1.18.06 2.04.53 2.79.55.75.02 1.52-.44 2.86-.49 1.96-.07 3.09.79 3.86 2.06-3.14 1.86-2.59 6.16.46 7.53-.5 1.12-.98 2.23-2 3.45zM12.03 7c-.09-2.51 2.22-4.93 4.76-5C17.07 4.47 14.67 7 12.03 7z"
            />
          </svg>
        );
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        hover:bg-gray-50/5 transition-colors duration-200 relative`}
    >
      {disabled ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        getProviderLogo()
      )}
      Continue with {provider}
    </button>
  );
};

export default SocialAuthButton;