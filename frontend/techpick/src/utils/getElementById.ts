'use client';

export const getElementById = (id: string) => {
  const element = document.querySelector(`#${id}`);

  if (!element) {
    throw new Error(`can not found ${id} element`);
  }
  return element;
};
