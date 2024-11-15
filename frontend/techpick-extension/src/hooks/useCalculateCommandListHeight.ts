import { MutableRefObject, useEffect, useState } from 'react';
import { useTagStore } from '@/stores';

export function useCalculateCommandListHeight(
  selectedTagListRef: MutableRefObject<HTMLDivElement | null>
) {
  const { selectedTagList } = useTagStore();
  const [commandListHeight, setCommandListHeight] = useState(0);

  useEffect(
    function calculateCommandListHeight() {
      const COMMAND_LIST_INITIAL_HEIGHT = 160;
      const COMMAND_LIST_MAX_HEIGHT = 208;

      if (!selectedTagListRef.current) {
        // 초기에는 초기값 부여
        setCommandListHeight(COMMAND_LIST_INITIAL_HEIGHT);
        return;
      }

      const { height } = selectedTagListRef.current.getBoundingClientRect();
      const commandListHeight = Math.max(
        0,
        Math.min(COMMAND_LIST_INITIAL_HEIGHT, COMMAND_LIST_MAX_HEIGHT - height)
      );
      setCommandListHeight(commandListHeight);
    },
    [selectedTagList, selectedTagListRef]
  );

  return { commandListHeight };
}
