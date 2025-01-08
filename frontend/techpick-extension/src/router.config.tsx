import { createMemoryRouter } from 'react-router-dom';
import { BookmarkPage, ErrorPage } from '@/pages';
import { PUBLIC_DOMAIN } from './constants';
import { getAccessToken } from './libs/@chrome/getCookie';
import { jwtDecode } from 'jwt-decode';
import mixpanel from '@/libs/@mixpanel/mixpanel-client';

export const router = createMemoryRouter([
  {
    path: '/',
    loader: async () => {
      const accessTokenCookie = await getAccessToken();

      if (!accessTokenCookie) {
        chrome.tabs.create({ url: PUBLIC_DOMAIN });
        return false;
      }

      const userId = accessTokenCookie
        ? jwtDecode<AccessTokenInfoType>(accessTokenCookie.value).id
        : 'anonymous';

      mixpanel.identify(userId);

      return true;
    },
    element: <BookmarkPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

interface AccessTokenInfoType {
  id: string;
}
