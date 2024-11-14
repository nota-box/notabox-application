import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { SearchSuggestion } from '../types';
import FilterPopup from './FilterPopup';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: SearchSuggestion[];
  onFocus: () => void;
  isDarkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  suggestions,
  onFocus,
  isDarkMode,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.text.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [value, suggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowFilter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center ${
        isDarkMode 
          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
          : 'bg-white/50 hover:bg-white/70'
        } backdrop-blur-md rounded-full shadow-lg transition-all duration-300 group`}>
        <Search className={`w-5 h-5 ml-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        } group-hover:text-purple-500 transition-colors duration-200`} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setShowSuggestions(true);
            onFocus();
          }}
          placeholder="Search files, documents, and more..."
          className={`w-full py-4 px-4 text-lg rounded-full focus:outline-none ${
            isDarkMode 
              ? 'bg-transparent text-white placeholder-gray-400' 
              : 'bg-transparent text-gray-900 placeholder-gray-500'
          }`}
        />
        <button 
          className={`p-2 mr-4 rounded-full transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-700/50' 
              : 'hover:bg-gray-100/50'
          }`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter className={`w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          } group-hover:text-purple-500 transition-colors duration-200`} />
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className={`absolute left-0 right-0 mt-2 rounded-2xl shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800/90' 
            : 'bg-white/90'
        } backdrop-blur-md overflow-hidden z-50 animate-fade-in`}>
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => {
                onChange(suggestion.text);
                setShowSuggestions(false);
              }}
              className={`px-6 py-3 cursor-pointer transition-colors duration-200 ${
                isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Search className="w-4 h-4 mr-3 text-purple-500" />
                  {suggestion.text}
                </span>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {suggestion.frequency} results
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter Popup */}
      {showFilter && (
        <FilterPopup isDarkMode={isDarkMode} onClose={() => setShowFilter(false)} />
      )}
    </div>
  );
};

export default SearchBar;