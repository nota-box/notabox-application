import React from 'react';
import SettingSection from '../SettingSection';
import SettingRow from '../SettingRow';
import Toggle from '../../common/Toggle';

interface SecuritySettingsProps {
  isDarkMode: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      <SettingSection title="Authentication">
        <SettingRow
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="Recovery Email"
          description="Backup email for account recovery"
        >
          <input
            type="email"
            placeholder="recovery@example.com"
            className={`px-3 py-1.5 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            } border`}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Session Management">
        <SettingRow
          title="Active Sessions"
          description="Manage devices where you're logged in"
        >
          <button className={`px-3 py-1.5 rounded-lg text-sm ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            View Sessions
          </button>
        </SettingRow>

        <SettingRow
          title="Auto Logout"
          description="Automatically log out after inactivity"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="never">Never</option>
            <option value="1h">After 1 hour</option>
            <option value="4h">After 4 hours</option>
            <option value="24h">After 24 hours</option>
          </select>
        </SettingRow>
      </SettingSection>

      <SettingSection title="Privacy">
        <SettingRow
          title="Activity Tracking"
          description="Allow collection of usage data"
        >
          <Toggle checked={true} onChange={() => {}} />
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default SecuritySettings;