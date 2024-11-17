import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { HOST_PERMISSIONS_HTTPS, PUBLIC_DOMAIN } from '@/constants';

export function LoginGuard({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoadFirst = useRef<boolean>(true);

  useEffect(function checkAccessToken() {
    const getAccessToken = async () => {
      const accessTokenCookie = await chrome.cookies.get({
        name: 'access_token',
        url: HOST_PERMISSIONS_HTTPS,
      });

      if (!accessTokenCookie) {
        chrome.tabs.create({ url: PUBLIC_DOMAIN });
        return;
      }

      setIsLoggedIn(true);
    };

    if (isLoadFirst.current) {
      isLoadFirst.current = false;
      getAccessToken();
    }
  }, []);

  return <>{isLoggedIn && children}</>;
}
