import { HOST_PERMISSIONS_HTTPS } from '@/constants';

export const getAccessToken = async () => {
  const accessTokenCookie = await chrome.cookies.get({
    name: 'access_token',
    url: HOST_PERMISSIONS_HTTPS,
  });

  return accessTokenCookie;
};
