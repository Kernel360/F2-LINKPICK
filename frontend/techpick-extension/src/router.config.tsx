import { createMemoryRouter } from 'react-router-dom';
import { BookmarkPage, ErrorPage } from '@/pages';
import { PUBLIC_DOMAIN } from './constants';
import { getAccessToken } from './libs/@chrome/getCookie';

export const router = createMemoryRouter([
  {
    path: '/',
    loader: async () => {
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
