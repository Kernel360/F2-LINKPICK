import { Plus } from 'lucide-react';
import {
  createFolderInputLayout,
  inputStyle,
  labelStyle,
} from './createFolderInput.css';

export function CreateFolderInput({ parentFolderId }: CreateFolderInputProps) {
  console.log(parentFolderId);

  return (
    <div className={createFolderInputLayout}>
      <label htmlFor="" className={labelStyle}>
        <Plus size={16} />
      </label>
      <input type="text" className={inputStyle} />
    </div>
  );
}

interface CreateFolderInputProps {
  parentFolderId: number;
}
