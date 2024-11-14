import React from 'react';

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-purple-500">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingSection;