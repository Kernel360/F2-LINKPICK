'use client';

import { type PropsWithChildren, useEffect } from 'react';
import mixpanel from './mixpanel-client';

/**
 * @description 특정 페이지에 방문했는지 확인하는 컴포넌트입니다.
 * @param eventName 해당 이벤트의 이름입니다. snake case로 명세해주세요. ex) shared_page_view
 * @param logInfo 이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요.
 */
export async function ScreenLogger({
  eventName,
  logInfo = {},
  children,
}: PropsWithChildren<ScreenLoggerProps>) {
  useEffect(() => {
    mixpanel.track(eventName, logInfo);
  }, [eventName, logInfo]);

  return <>{children}</>;
}

interface ScreenLoggerProps {
  eventName: string;
  logInfo?: object;
}
