import React from 'react';
import { ChevronRight, Book, Search, FileText, Upload, User, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string;
}

const sections: Section[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    content: `
# Welcome to NotaBox

NotaBox is a modern file management system that helps you organize, search, and share your files efficiently.

## Quick Start
1. Sign in using your preferred method
2. Upload your first file using the upload button
3. Use the search bar to find your files
4. Organize files with tags and metadata
    `
  },
  {
    id: 'search',
    title: 'Search Features',
    icon: Search,
    content: `
# Search Functionality

The search system in NotaBox is powerful and flexible:

- **Real-time suggestions** appear as you type
- **Filter results** using the filter icon
- **Tags** can be used to narrow down results
- **Advanced search** supports metadata fields
    `
  },
  {
    id: 'file-management',
    title: 'File Management',
    icon: FileText,
    content: `
# Managing Your Files

Learn how to effectively manage your files in NotaBox:

- **Upload files** individually or in bulk
- **Add metadata** to improve searchability
- **Tag files** for better organization
- **Version control** keeps track of changes
    `
  },
  {
    id: 'uploading',
    title: 'Uploading Files',
    icon: Upload,
    content: `
# File Upload Guide

NotaBox supports various upload methods:

- **Drag and drop** files directly
- **Click to upload** using the file picker
- **Bulk upload** multiple files at once
- **Add metadata** during upload
    `
  },
  {
    id: 'account',
    title: 'Account Management',
    icon: User,
    content: `
# Managing Your Account

Learn about account features:

- **Profile settings** customization
- **Authentication** options
- **Security** best practices
- **Preferences** configuration
    `
  },
  {
    id: 'settings',
    title: 'System Settings',
    icon: Settings,
    content: `
# System Configuration

Customize NotaBox to your needs:

- **Theme preferences** (light/dark mode)
- **Display options** customization
- **Notification** settings
- **Integration** configuration
    `
  }
];

interface DocsLayoutProps {
  isDarkMode: boolean;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ isDarkMode }) => {
  const [activeSection, setActiveSection] = React.useState(sections[0].id);
  const { user } = useAuthStore();

  const activeContent = sections.find(section => section.id === activeSection);

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className={`sticky top-28 rounded-xl overflow-hidden ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-md shadow-lg p-4`}>
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <nav className="space-y-1">
                {sections.map(section => {
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
              {activeContent && (
                <div className="prose prose-lg max-w-none">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-purple-100'
                    }`}>
                      {React.createElement(activeContent.icon, {
                        className: 'w-5 h-5 text-purple-500'
                      })}
                    </div>
                    <h1 className="text-3xl font-bold m-0">{activeContent.title}</h1>
                  </div>
                  <div className={`${isDarkMode ? 'prose-invert' : ''}`}>
                    {activeContent.content.split('\n').map((line, index) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={index}>{line.slice(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={index}>{line.slice(3)}</h2>;
                      } else if (line.startsWith('- **')) {
                        const [bold, text] = line.slice(3).split('**');
                        return (
                          <div key={index} className="flex items-start gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                            <p className="m-0">
                              <strong>{bold}</strong>
                              {text}
                            </p>
                          </div>
                        );
                      } else if (line.trim()) {
                        return <p key={index}>{line}</p>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;