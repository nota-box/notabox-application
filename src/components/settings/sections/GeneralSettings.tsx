import React from 'react';
import SettingSection from '../SettingSection';
import SettingRow from '../SettingRow';
import Toggle from '../../common/Toggle';

interface GeneralSettingsProps {
  isDarkMode: boolean;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">General Settings</h2>

      <SettingSection title="Appearance">
        <SettingRow
          title="Theme"
          description="Choose between light and dark mode"
        >
          <div className="flex items-center gap-2">
            <span>Light</span>
            <Toggle
              checked={isDarkMode}
              onChange={() => {}} // Handled by parent
            />
            <span>Dark</span>
          </div>
        </SettingRow>

        <SettingRow
          title="Compact Mode"
          description="Show more content with reduced spacing"
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Language">
        <SettingRow
          title="Display Language"
          description="Select your preferred language"
        >
          <select className={`px-3 py-1.5 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-white border-gray-200'
          } border`}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </SettingRow>
      </SettingSection>

      <SettingSection title="Accessibility">
        <SettingRow
          title="Reduce Motion"
          description="Minimize animations throughout the interface"
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>

        <SettingRow
          title="High Contrast"
          description="Increase contrast for better visibility"
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingRow>
      </SettingSection>
    </div>
  );
};

export default GeneralSettings;