import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import UploadModal from './components/UploadModal';
import AuthModal from './components/auth/AuthModal';
import DocsLayout from './components/docs/DocsLayout';
import SettingsLayout from './components/settings/SettingsLayout';
import { SearchSuggestion } from './types';

const DUMMY_SUGGESTIONS: SearchSuggestion[] = [
  { id: 1, text: 'quarterly reports 2024', frequency: 5 },
  { id: 2, text: 'project proposals', frequency: 3 },
  { id: 3, text: 'meeting notes', frequency: 8 },
  { id: 4, text: 'design assets', frequency: 4 },
];

function App() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  if (showDocs) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            className: isDarkMode ? '!bg-gray-800 !text-white' : '',
          }}
        />
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          onUploadClick={() => setIsUploadModalOpen(true)}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onDocsClick={() => setShowDocs(false)}
          onSettingsClick={() => {
            setShowDocs(false);
            setShowSettings(true);
          }}
        />
        <DocsLayout isDarkMode={isDarkMode} />
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            className: isDarkMode ? '!bg-gray-800 !text-white' : '',
          }}
        />
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          onUploadClick={() => setIsUploadModalOpen(true)}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onDocsClick={() => {
            setShowSettings(false);
            setShowDocs(true);
          }}
          onSettingsClick={() => setShowSettings(false)}
        />
        <SettingsLayout 
          isDarkMode={isDarkMode} 
          onClose={() => setShowSettings(false)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          className: isDarkMode ? '!bg-gray-800 !text-white' : '',
        }}
      />
      
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        onUploadClick={() => setIsUploadModalOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onDocsClick={() => setShowDocs(true)}
        onSettingsClick={() => setShowSettings(true)}
      />

      <main className="container mx-auto px-4">
        {/* Search Section */}
        <div className={`sticky top-0 z-30 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        } transition-all duration-300 pt-20`}>
          <div className={`flex flex-col items-center transition-all duration-300 ${
            isSearchFocused ? 'mt-0' : 'mt-24'
          }`}>
            {!isSearchFocused && (
              <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-purple-700 
                            bg-clip-text text-transparent animate-fade-in">
                NotaBox
              </h1>
            )}
            
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              suggestions={DUMMY_SUGGESTIONS}
              onFocus={() => setIsSearchFocused(true)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Results Section */}
        {isSearchFocused && searchQuery && (
          <div className="mt-4 pb-8">
            <SearchResults isDarkMode={isDarkMode} />
          </div>
        )}
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;