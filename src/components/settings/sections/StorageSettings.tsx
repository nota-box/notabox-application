import React from 'react';
import SettingSection from '../SettingSection';
import SettingRow from '../SettingRow';
import Toggle from '../../common/Toggle';

interface StorageSettingsProps {
  isDarkMode: boolean;
}

const StorageSettings: React.FC<StorageSettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Storage Settings</h2>

      <SettingSection title="Storage Usage">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Used Storage</span>
            <span>15.2 GB of 100 GB</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full"
              style={{ width: '15.2%' }}
            />
          </div>
        </div>

        <SettingRow
          title="Storage Plan"
          description="Current storage subscription"
        >
          <button className={`px-3 py-1.5 rounded-lg text-sm ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            Upgrade Plan
          </button>
        </SettingRow>
      </SettingSection>

      <SettingSection title="File Management">
        <SettingRow
          title="Auto Delete"
          description="Remove files after specified time"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="never">Never</option>
            <option value="30d">After 30 days</option>
            <option value="90d">After 90 days</option>
            <option value="180d">After 180 days</option>
          </select>
        </SettingRow>

        <SettingRow
          title="Version History"
          description="Keep previous versions of files"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Optimization">
        <SettingRow
          title="Compress Files"
          description="Automatically compress large files"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Smart Cache"
          description="Cache frequently accessed files"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default StorageSettings;