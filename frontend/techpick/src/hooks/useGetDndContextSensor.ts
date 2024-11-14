import type { Dispatch, SetStateAction } from 'react';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

export function useGetDndContextSensor({
  setElementClickPosition,
}: UseGetDndContextSensorProps) {
  const onActivation = (event: MouseEvent | TouchEvent) => {
    let targetElement = event.target as HTMLElement | null;

    while (
      targetElement &&
      !targetElement.id.includes('folder') &&
      !targetElement.id.includes('pick')
    ) {
      targetElement = targetElement.parentElement;
    }

    if (!(targetElement && 'getBoundingClientRect' in targetElement)) {
      return;
    }

    const rect = targetElement.getBoundingClientRect();

    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    setElementClickPosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // MouseSensor: 10px 이동해야 드래그 시작
    },
    onActivation({ event }: { event: MouseEvent | TouchEvent }) {
      onActivation(event);
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
    onActivation({ event }: { event: MouseEvent | TouchEvent }) {
      onActivation(event);
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return { sensors };
}

interface UseGetDndContextSensorProps {
  setElementClickPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}
