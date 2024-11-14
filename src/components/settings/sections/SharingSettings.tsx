import React from 'react';
import SettingSection from '../SettingSection';
import SettingRow from '../SettingRow';
import Toggle from '../../common/Toggle';

interface SharingSettingsProps {
  isDarkMode: boolean;
}

const SharingSettings: React.FC<SharingSettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Sharing Settings</h2>

      <SettingSection title="Default Permissions">
        <SettingRow
          title="Link Sharing"
          description="Allow sharing files via links"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Default Access"
          description="Set default access level for shared files"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="view">View only</option>
            <option value="comment">Can comment</option>
            <option value="edit">Can edit</option>
          </select>
        </SettingRow>
      </SettingSection>

      <SettingSection title="Link Settings">
        <SettingRow
          title="Password Protection"
          description="Require password for shared links"
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Link Expiration"
          description="Set default expiration for shared links"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="never">Never</option>
            <option value="1d">1 day</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
            <option value="custom">Custom</option>
          </select>
        </SettingRow>
      </SettingSection>

      <SettingSection title="Collaboration">
        <SettingRow
          title="Comments"
          description="Allow comments on shared files"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Download Permission"
          description="Allow file downloads by default"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default SharingSettings;