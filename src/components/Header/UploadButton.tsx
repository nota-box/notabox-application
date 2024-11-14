import React from 'react';
import { Upload } from 'lucide-react';
import IconButton from '../common/IconButton';

interface UploadButtonProps {
  onClick: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      icon={Upload}
      label="Upload files"
      onClick={onClick}
    />
  );
};

export default UploadButton;