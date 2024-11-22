export const formatDateString = (dateStringFromServer: string) => {
  const date = new Date(dateStringFromServer);
  const year = date.getFullYear(); // 2023
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 06
  const day = date.getDate().toString().padStart(2, '0'); // 18
  return year + '-' + month + '-' + day;
};
