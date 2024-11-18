import * as Select from '@radix-ui/react-select';
import { getElementById } from '@/utils';
import { PORTAL_CONTAINER_ID } from '@/constants';
import {
  folderSelectTriggerButtonStyle,
  folderSelectContentStyle,
  selectItemStyle,
  selectTextStyle,
} from './FolderSelect.css';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import { FolderType } from '@/types';
import type { Dispatch, SetStateAction } from 'react';
import { CubeIcon } from '@radix-ui/react-icons';

export function FolderSelect({
  folderInfoList,
  selectedFolderId,
  setSelectedFolderId,
}: FolderSelectProps) {
  const portalContainerElement = getElementById(PORTAL_CONTAINER_ID);

  return (
    <Select.Root
      value={selectedFolderId}
      onValueChange={(value) => {
        setSelectedFolderId(value);
      }}
    >
      <Select.Trigger className={folderSelectTriggerButtonStyle}>
        <div className={selectItemStyle}>
          <CubeIcon width={16} height={16} />

          <p className={selectTextStyle}>
            <Select.Value placeholder={'folder를 선택해주세요.'} />
          </p>
          <Select.Icon>
            <ChevronDownIcon size={16} />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal container={portalContainerElement}>
        <Select.Content className={folderSelectContentStyle}>
          <Select.Viewport>
            {folderInfoList.map((folderInfo) => (
              <Select.Item
                key={folderInfo.id}
                value={`${folderInfo.id}`}
                className={selectItemStyle}
              >
                <CubeIcon width={16} height={16} />
                <p className={selectTextStyle}>
                  <Select.ItemText>{folderInfo.name}</Select.ItemText>
                </p>

                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

interface FolderSelectProps {
  folderInfoList: FolderType[];
  selectedFolderId: string;
  setSelectedFolderId: Dispatch<SetStateAction<string>>;
}
