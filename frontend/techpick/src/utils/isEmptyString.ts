export const isEmptyString = (string: string | null | undefined) => {
  if (typeof string !== 'string') {
    return true;
  }

  return string.trim() === '';
};
