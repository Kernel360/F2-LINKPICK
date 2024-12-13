export const getItemFromLocalStorage = <ItemType>(key: string) => {
  const item = localStorage.getItem(key);

  if (!item) {
    return undefined;
  }

  const parseItem: ItemType | undefined = JSON.parse(item);
  return parseItem;
};
