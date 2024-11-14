import React, { useState } from 'react';
import { X, Save, Calendar, User, Tag, Info } from 'lucide-react';
import { SearchResult } from '../types';

interface ResultDetailModalProps {
  result: SearchResult;
  onClose: () => void;
  isDarkMode: boolean;
}

const ResultDetailModal: React.FC<ResultDetailModalProps> = ({
  result,
  onClose,
  isDarkMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResult, setEditedResult] = useState(result);
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setIsEditing(false);
  };

  const addTag = () => {
    if (newTag.trim() && !editedResult.tags.includes(newTag.trim())) {
      setEditedResult({
        ...editedResult,
        tags: [...editedResult.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditedResult({
      ...editedResult,
      tags: editedResult.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const Icon = result.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-3xl rounded-2xl shadow-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-purple-100/50'
            }`}>
              <Icon className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedResult.name}
                  onChange={(e) => setEditedResult({ ...editedResult, name: e.target.value })}
                  className={`text-xl font-medium px-2 py-1 rounded ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                />
              ) : (
                <h2 className="text-xl font-medium">{result.name}</h2>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
              >
                <Save className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Info className="w-4 h-4" />
              Description
            </label>
            {isEditing ? (
              <textarea
                value={editedResult.description}
                onChange={(e) => setEditedResult({ ...editedResult, description: e.target.value })}
                className={`w-full p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
                rows={3}
              />
            ) : (
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {result.description}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Tag className="w-4 h-4" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {editedResult.tags.map((tag) => (
                <span
                  key={tag}
                  className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                    isDarkMode
                      ? 'bg-gray-700/50 text-gray-300'
                      : 'bg-purple-50 text-purple-700'
                  }`}
                >
                  #{tag}
                  {isEditing && (
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tag..."
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  />
                  <button
                    onClick={addTag}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* File Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Calendar className="w-4 h-4" />
                File Details
              </label>
              <div className={`space-y-2 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <p>Type: {result.type}</p>
                <p>Size: {result.size}</p>
                <p>Version: {result.version}</p>
                <p>Status: {result.status}</p>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User className="w-4 h-4" />
                History
              </label>
              <div className={`space-y-2 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <p>Created by: {result.createdBy}</p>
                <p>Last modified by: {result.lastModifiedBy}</p>
                <p>Modified: {result.modified}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailModal;