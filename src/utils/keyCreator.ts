export const keyCreator = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  data: T[],
  idFieldName: K
): (T & { key: string })[] => {
  return data.map((item) => ({
    ...item,
    key: String(item[idFieldName]),
    id: String(item[idFieldName]),
  }));
};
