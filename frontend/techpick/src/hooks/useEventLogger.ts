'use client';

import mixpanel from '@/libs/mixpanel-client';

/**
 * @description 특정 액션에 로그를 추가하는 훅입니다.
 * @param eventName 해당 이벤트의 이름입니다. snake case로 명세해주세요. ex) shared_page_sign_up_button_click
 * @param userId 인증된 사용자의 ID입니다. 없을 경우 'anonymous'로 처리됩니다.
 * @param logInfo 이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요.
 * @returns trackEvent 액션에 추가해주세요.
 */
export function useEventLogger({
  eventName,
  userId = 'anonymous',
  logInfo = {},
}: UseEventLoggerParameter) {
  const trackEvent = () => {
    mixpanel.identify(userId);
    mixpanel.track(eventName, {
      userId,
      ...logInfo,
    });
  };

  return { trackEvent };
}

interface UseEventLoggerParameter {
  eventName: string;
  userId?: string;
  logInfo?: object;
}
