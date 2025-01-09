export const isMacOS = () => {
  if (typeof window !== 'undefined') {
    return window.navigator.userAgent.toLowerCase().indexOf('mac') > -1;
  }
  return false;
};
