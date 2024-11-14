import React from 'react';
import SettingSection from '../SettingSection';
import SettingRow from '../SettingRow';
import { useAuthStore } from '../../../stores/authStore';

interface ProfileSettingsProps {
  isDarkMode: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isDarkMode }) => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

      <SettingSection title="Personal Information">
        <SettingRow
          title="Profile Picture"
          description="Update your profile photo"
        >
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <button className={`px-3 py-1.5 rounded-lg text-sm ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}>
              Change
            </button>
          </div>
        </SettingRow>

        <SettingRow
          title="Display Name"
          description="Your name visible to other users"
        >
          <input
            type="text"
            defaultValue={user?.name || ''}
            className={`px-3 py-1.5 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            } border`}
          />
        </SettingRow>

        <SettingRow
          title="Email Address"
          description="Your primary email address"
        >
          <input
            type="email"
            defaultValue={user?.email || ''}
            disabled
            className={`px-3 py-1.5 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700/50 border-gray-600' 
                : 'bg-gray-100 border-gray-200'
            } border opacity-75`}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Preferences">
        <SettingRow
          title="Time Zone"
          description="Your local time zone for notifications"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
          </select>
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default ProfileSettings;