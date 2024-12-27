import type { PropsWithChildren } from 'react';
import { mixpanelServer } from '@/libs/mixpanel-server';

/**
 * @description 특정 페이지에 방문했는지 확인하는 컴포넌트입니다.
 * @param eventName 해당 이벤트의 이름입니다. snake case로 명세해주세요. ex) shared_page_view
 * @param userId 인증된 사용자의 ID입니다. 없을 경우 익명 사용자로 처리됩니다.
 * @param logInfo 이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요.
 */
export function ScreenLogger({
  eventName,
  userId = 'anonymous',
  logInfo = {},
  children,
}: PropsWithChildren<ScreenLoggerProps>) {
  const properties: Record<string, unknown> = {
    ...logInfo,
    $user_id: userId,
  };

  mixpanelServer.track(eventName, properties);

  return <>{children}</>;
}

interface ScreenLoggerProps {
  eventName: string;
  userId?: string;
  logInfo?: object;
}
