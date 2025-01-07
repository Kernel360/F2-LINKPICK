import type { PropsWithChildren } from 'react';
import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { mixpanelServer } from '@/libs/mixpanel-server';

/**
 * @description 특정 페이지에 방문했는지 확인하는 서버 컴포넌트입니다.
 * @param eventName 해당 이벤트의 이름입니다. snake case로 명세해주세요. ex) shared_page_view
 * @param logInfo 이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요.
 */
export function ScreenLogger({
  eventName,
  logInfo = {},
  children,
}: PropsWithChildren<ScreenLoggerProps>) {
  const headersList = headers();
  const { device, os } = userAgent({ headers: headersList });
  const cookieStore = cookies();
  const access_token = cookieStore.get('access_token');
  const $user_id = access_token
    ? jwtDecode<AccessTokenInfoType>(access_token.value).id
    : 'anonymous';
  const $device_id = `${device.vendor || 'unknown'}-${device.type || undefined}-${device.model || 'unknown'}`;
  const device_type = device.type || 'unknown';
  const $os = os.name ?? 'unknown';

  const properties: Record<string, unknown> = {
    ...logInfo,
    $user_id,
    $device_id,
    device_type,
    $os,
  };

  mixpanelServer.track(eventName, properties);

  return <>{children}</>;
}

interface ScreenLoggerProps {
  eventName: string;
  logInfo?: object;
}

interface AccessTokenInfoType {
  id: string;
}
