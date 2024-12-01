'ues client';

import { PORTAL_CONTAINER_ID } from '@/constants';

export const getPortalContainer = () => {
  const portalContainer = document.querySelector(`#${PORTAL_CONTAINER_ID}`);

  if (!portalContainer) {
    throw new Error('can not found portal container');
  }
  return portalContainer;
};
