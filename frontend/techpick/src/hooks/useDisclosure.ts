'use client';

import { useState } from 'react';

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return { isOpen, onOpen, onClose, onToggle };
}
