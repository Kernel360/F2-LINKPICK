import mixpanel from '@/libs/@mixpanel/mixpanel-client';
import { jwtDecode } from 'jwt-decode';
import { createMemoryRouter } from 'react-router-dom';
import { PUBLIC_DOMAIN } from './constants/publicDomain';
import { getAccessToken } from './libs/@chrome/getCookie';
import { BookmarkPage } from './pages/BookmarkPage';
import { ErrorPage } from './pages/ErrorPage';

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
