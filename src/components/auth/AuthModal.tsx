import React, { useEffect, useRef } from 'react';
import { X, LogIn } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import SocialAuthButton from './SocialAuthButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const { signInWithGoogle, signInWithApple, signInAsGuest, isLoading } = useAuthStore();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAuth = async (authFunction: () => Promise<void>) => {
    try {
      await authFunction();
      onClose();
    } catch (error) {
      // Error is already handled in the auth store
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`w-full max-w-md rounded-2xl shadow-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } overflow-hidden animate-fade-in`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200/10">
          <h2 className="text-xl font-medium">Sign In</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <SocialAuthButton
            provider="Google"
            onClick={() => handleAuth(signInWithGoogle)}
            disabled={isLoading}
            isDarkMode={isDarkMode}
          />

          <SocialAuthButton
            provider="Apple"
            onClick={() => handleAuth(signInWithApple)}
            disabled={isLoading}
            isDarkMode={isDarkMode}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>Or continue with</span>
            </div>
          </div>

          <button
            onClick={() => handleAuth(signInAsGuest)}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
              border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              hover:bg-gray-50/5 transition-colors duration-200`}
          >
            <LogIn className="w-5 h-5" />
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;