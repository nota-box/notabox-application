import React from 'react';
import { Calendar, FileType, Clock, Tag } from 'lucide-react';

interface FilterPopupProps {
  isDarkMode: boolean;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isDarkMode, onClose }) => {
  return (
    <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg ${
      isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
    } backdrop-blur-md overflow-hidden z-50 animate-fade-in p-4`}>
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* File Type Filter */}
        <div>
          <div className="flex items-center mb-2">
            <FileType className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">File Type</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['PDF', 'Image', 'Document', 'Archive'].map((type) => (
              <label
                key={type}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'
                }`}
              >
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">Date Range</span>
          </div>
          <select className={`w-full p-2 rounded-lg text-sm ${
            isDarkMode 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-white/50 border-gray-200'
          } border`}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Custom range</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">Size</span>
          </div>
          <select className={`w-full p-2 rounded-lg text-sm ${
            isDarkMode 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-white/50 border-gray-200'
          } border`}>
            <option>Any size</option>
            <option>0-1 MB</option>
            <option>1-10 MB</option>
            <option>10-100 MB</option>
            <option>100+ MB</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center mb-2">
            <Tag className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm font-medium">Tags</span>
          </div>
          <input
            type="text"
            placeholder="Add tags..."
            className={`w-full p-2 rounded-lg text-sm ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600' 
                : 'bg-white/50 border-gray-200'
            } border`}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className={`px-3 py-1 rounded-lg text-sm ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 rounded-lg text-sm bg-purple-500 text-white hover:bg-purple-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;