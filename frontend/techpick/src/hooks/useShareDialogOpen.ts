import { useState } from 'react';

export function useShareDialogOpen() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>('');

  const handleDialogOpen = (newUuid: string) => {
    setIsDialogOpen(true);
    setUuid(newUuid);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setUuid('');
  };

  return { isDialogOpen, uuid, handleDialogOpen, handleDialogClose };
}
