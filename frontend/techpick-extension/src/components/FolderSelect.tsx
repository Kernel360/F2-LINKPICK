import * as Select from '@radix-ui/react-select';
import { getElementById } from '@/utils';
import { PORTAL_CONTAINER_ID } from '@/constants';
import {
  folderSelectTriggerButtonStyle,
  folderSelectContentStyle,
  selectItemStyle,
  selectTextStyle,
} from './FolderSelect.css';
import {
  Folder as FolderIcon,
  ChevronDown as ChevronDownIcon,
} from 'lucide-react';

export function FolderSelect() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const portalContainerElement = getElementById(PORTAL_CONTAINER_ID);

  return (
    <Select.Root>
      <Select.Trigger className={folderSelectTriggerButtonStyle}>
        <FolderIcon />
        <p className={selectTextStyle}>
          <Select.Value placeholder={'folder를 선택해주세요.'} />
        </p>
        <Select.Icon>
          <ChevronDownIcon size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal container={portalContainerElement}>
        <Select.Content className={folderSelectContentStyle}>
          <Select.Viewport>
            {arr.map((value) => (
              <Select.Item
                key={value}
                value={`${value}`}
                className={selectItemStyle}
              >
                <FolderIcon />
                <p className={selectTextStyle}>
                  <Select.ItemText>{value}</Select.ItemText>
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
