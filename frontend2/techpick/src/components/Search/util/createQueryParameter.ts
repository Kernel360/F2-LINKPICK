const createQueryParameter = (
  ...params: { key: string; values: unknown[] }[]
): string => {
  const queryParams = [];
  for (const arg of params) {
    if (arg.values.length < 1) continue;
    queryParams.push(`${arg.key}=${arg.values.join(',')}`);
  }
  return queryParams.join('&');
};

export default createQueryParameter;
