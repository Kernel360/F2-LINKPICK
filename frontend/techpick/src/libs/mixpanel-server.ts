import Mixpanel from 'mixpanel';

const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

if (!mixpanelToken) {
  throw new Error(
    'NEXT_PUBLIC_MIXPANEL_TOKEN is not set in environment variables'
  );
}

/**
 * @description 서버 컴포넌트나 서버 환경에서 mixpanel을 활용할 때 사용합니다.
 */
export const mixpanelServer = Mixpanel.init(mixpanelToken);
