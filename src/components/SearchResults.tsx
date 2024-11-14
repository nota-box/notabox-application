import React, { useState } from 'react';
import { File, FileText, Image, FileArchive } from 'lucide-react';
import ResultDetailModal from './ResultDetailModal';
import { SearchResult } from '../types';

interface SearchResultsProps {
  isDarkMode: boolean;
}

const DUMMY_RESULTS: SearchResult[] = [
  {
    id: 1,
    name: 'Q4 Financial Report 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    modified: '2024-03-15',
    icon: FileText,
    description: 'Quarterly financial analysis and projections',
    tags: ['finance', 'quarterly', 'reports', '2024'],
    createdBy: 'John Doe',
    lastModifiedBy: 'Jane Smith',
    version: '1.2',
    status: 'Final'
  },
  {
    id: 2,
    name: 'Project Presentation.pptx',
    type: 'PPTX',
    size: '5.1 MB',
    modified: '2024-03-14',
    icon: File,
    description: 'Company overview and project roadmap',
    tags: ['presentation', 'project', 'roadmap'],
    createdBy: 'Alice Johnson',
    lastModifiedBy: 'Bob Wilson',
    version: '2.0',
    status: 'Draft'
  },
  {
    id: 3,
    name: 'Design Assets.zip',
    type: 'ZIP',
    size: '15.2 MB',
    modified: '2024-03-13',
    icon: FileArchive,
    description: 'Brand assets and design resources',
    tags: ['design', 'assets', 'brand'],
    createdBy: 'Sarah Parker',
    lastModifiedBy: 'Sarah Parker',
    version: '1.0',
    status: 'Archive'
  },
  {
    id: 4,
    name: 'Team Photo.jpg',
    type: 'JPG',
    size: '3.7 MB',
    modified: '2024-03-12',
    icon: Image,
    description: 'Company retreat group photo',
    tags: ['photo', 'team', 'event'],
    createdBy: 'Mike Brown',
    lastModifiedBy: 'Mike Brown',
    version: '1.0',
    status: 'Published'
  },
];

const SearchResults: React.FC<SearchResultsProps> = ({ isDarkMode }) => {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-8 space-y-4 animate-fade-in px-4">
        {DUMMY_RESULTS.map((result, index) => {
          const Icon = result.icon;
          return (
            <div
              key={result.id}
              onClick={() => setSelectedResult(result)}
              className={`rounded-2xl overflow-hidden transition-all duration-200 animate-slide-up cursor-pointer
                ${isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                  : 'bg-white/50 hover:bg-white/70'
                } backdrop-blur-md shadow-lg`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className={`p-3 rounded-xl transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-purple-100/50'
                  }`}>
                    <Icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{result.name}</h3>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        isDarkMode 
                          ? 'bg-gray-700/50 text-gray-300' 
                          : 'bg-purple-100/50 text-purple-700'
                      }`}>
                        {result.type}
                      </span>
                    </div>
                    <p className={`text-sm mt-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {result.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {result.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDarkMode
                              ? 'bg-gray-700/50 text-gray-300'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {result.size}
                        </span>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Modified: {result.modified}
                        </span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-700/50 text-gray-300'
                          : 'bg-purple-50 text-purple-700'
                      }`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedResult && (
        <ResultDetailModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default SearchResults;