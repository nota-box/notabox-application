import React from 'react';
import SettingSection from '../SettingSection';
import SettingRow from '../SettingRow';
import Toggle from '../../common/Toggle';

interface NotificationSettingsProps {
  isDarkMode: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>

      <SettingSection title="Email Notifications">
        <SettingRow
          title="File Updates"
          description="Receive notifications when files are modified"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Sharing"
          description="Get notified when files are shared with you"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Comments"
          description="Notifications for comments on your files"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Push Notifications">
        <SettingRow
          title="Enable Push Notifications"
          description="Receive notifications even when browser is closed"
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Notification Frequency">
        <SettingRow
          title="Digest Frequency"
          description="How often to receive notification summaries"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="instant">Instant</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default NotificationSettings;