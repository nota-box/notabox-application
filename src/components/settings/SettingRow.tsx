import React from 'react';

interface SettingRowProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({ title, description, children }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );
};

export default SettingRow;