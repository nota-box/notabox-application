import React, { useState } from 'react';
import { X, Upload as UploadIcon, Plus, Minus } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

interface MetaTag {
  id: number;
  key: string;
  value: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const addMetaTag = () => {
    setMetaTags([...metaTags, { id: Date.now(), key: '', value: '' }]);
  };

  const removeMetaTag = (id: number) => {
    setMetaTags(metaTags.filter(tag => tag.id !== id));
  };

  if (!isOpen) return null;

  const modalClass = `fixed inset-0 z-50 flex items-center justify-center p-4 ${
    isDarkMode ? 'bg-black/50' : 'bg-gray-500/50'
  }`;

  const contentClass = `w-full max-w-2xl rounded-2xl shadow-xl ${
    isDarkMode ? 'bg-gray-800' : 'bg-white'
  } p-6`;

  const inputClass = `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  return (
    <div className={modalClass}>
      <div className={contentClass}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload File</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200/20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* File Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center ${
            dragActive
              ? 'border-purple-500 bg-purple-500/10'
              : isDarkMode
              ? 'border-gray-600'
              : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <p className="text-lg mb-2">
            Drag and drop your files here, or{' '}
            <span className="text-purple-500 cursor-pointer">browse</span>
          </p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            Supports all file types up to 50MB
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Enter file title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Enter file description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-purple-500 text-white text-sm"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags (press Enter)"
              className={inputClass}
            />
          </div>

          {/* Meta Tags */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Custom Fields</label>
              <button
                onClick={addMetaTag}
                className="flex items-center text-purple-500 hover:text-purple-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Field
              </button>
            </div>
            {metaTags.map((tag) => (
              <div key={tag.id} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={tag.key}
                  onChange={(e) =>
                    setMetaTags(
                      metaTags.map((t) =>
                        t.id === tag.id ? { ...t, key: e.target.value } : t
                      )
                    )
                  }
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={tag.value}
                  onChange={(e) =>
                    setMetaTags(
                      metaTags.map((t) =>
                        t.id === tag.id ? { ...t, value: e.target.value } : t
                      )
                    )
                  }
                  className={inputClass}
                />
                <button
                  onClick={() => removeMetaTag(tag.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;