import { createMemoryRouter } from 'react-router-dom';
import { BookmarkPage, ErrorPage } from '@/pages';
import { HOST_PERMISSIONS_HTTPS, PUBLIC_DOMAIN } from './constants';

export const router = createMemoryRouter([
  {
    path: '/',
    loader: async () => {
      const getAccessToken = async () => {
        const accessTokenCookie = await chrome.cookies.get({
          name: 'access_token',
          url: HOST_PERMISSIONS_HTTPS,
        });

        return accessTokenCookie;
      };

      const accessTokenCookie = await getAccessToken();

      if (!accessTokenCookie) {
        chrome.tabs.create({ url: PUBLIC_DOMAIN });
        return false;
      }

      return true;
    },
    element: <BookmarkPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);
