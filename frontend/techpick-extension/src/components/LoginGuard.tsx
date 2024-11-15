import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOST_PERMISSIONS_HTTPS } from '@/constants';

export function LoginGuard({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function checkAccessToken() {
      const getAccessToken = async () => {
        const accessTokenCookie = await chrome.cookies.get({
          name: 'access_token',
          url: HOST_PERMISSIONS_HTTPS,
        });

        if (!accessTokenCookie) {
          navigate('/login');
          return;
        }

        setIsLoggedIn(true);
      };

      getAccessToken();
    },
    [navigate]
  );

  return <>{isLoggedIn && children}</>;
}
