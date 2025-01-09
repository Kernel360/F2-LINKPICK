export const setItemToLocalStorage = (key: string, item: unknown) => {
  const jsonItem = JSON.stringify(item);
  localStorage.setItem(key, jsonItem);
};
