'use client';

import mixpanel from '@/libs/mixpanel-client';

/**
 * @description 특정 액션에 로그를 추가하는 훅입니다.
 * @param eventName 해당 이벤트의 이름입니다. snake case로 명세해주세요. ex) shared_page_sign_up_button_click
 * @param logInfo 이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요.
 * @returns trackEvent 액션에 추가해주세요.
 *
 * @example
 * // do
 * onClick={()=>{trackLoginButtonClick()}}
 * // don't
 * onClick={trackLoginButtonClick}
 */
export function useEventLogger({
  eventName,
  logInfo = {},
}: UseEventLoggerParameter) {
  /**
   *
   * @param trackEventLogInfo  이벤트의 추가적인 정보를 담고 싶을 때 사용해주세요. logInfo보다 우선순위가 낮습니다.
   */
  const trackEvent = (trackEventLogInfo: object = {}) => {
    mixpanel.track(eventName, {
      ...trackEventLogInfo,
      ...logInfo,
    });
  };

  return { trackEvent };
}

interface UseEventLoggerParameter {
  eventName: string;
  logInfo?: object;
}
