'use server';

import { mixpanelServer } from '@/libs/mixpanel-server';
import { getUserIdForServer } from '@/utils/getUserIdForServer';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import type { PropsWithChildren } from 'react';

/**
 * @description 특정 페이지에 방문했는지 확인하는 서버 컴포넌트입니다.
 * @param eventName 해당 이벤트의 이름입니다. snake case로 명세해주세요. ex) shared_page_view
 * @param logInfo 이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요.
 */
export async function ScreenLogger({
  eventName,
  logInfo = {},
  children,
}: PropsWithChildren<ScreenLoggerProps>) {
  const headersList = headers();
  const { device, os } = userAgent({ headers: headersList });
  const $user_id = await getUserIdForServer();
  const $device_id = `${device.vendor || 'unknown'}-${device.type || undefined}-${device.model || 'unknown'}`;
  const deviceType = device.type || 'unknown';
  const $os = os.name ?? 'unknown';

  const properties: Record<string, unknown> = {
    ...logInfo,
    $user_id,
    $device_id,
    deviceType,
    $os,
  };

  mixpanelServer.track(eventName, properties);

  return <>{children}</>;
}

interface ScreenLoggerProps {
  eventName: string;
  logInfo?: object;
}
