'use client';

import * as Switch from '@radix-ui/react-switch';
import { IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { switchRoot, switchThumb } from './tutorialReplaySwitch.css';

export function TutorialReplaySwitch({
  labelTargetId,
}: TutorialReplaySwitchProps) {
  const { setValue: setIsTutorialSeen } = useLocalStorage(
    IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY,
    false
  );

  return (
    <Switch.Root
      className={switchRoot}
      defaultChecked={false}
      onCheckedChange={(isTutorialSeen) => {
        setIsTutorialSeen(!isTutorialSeen);
      }}
      id={labelTargetId}
    >
      <Switch.Thumb className={switchThumb} />
    </Switch.Root>
  );
}

interface TutorialReplaySwitchProps {
  labelTargetId?: string;
}
