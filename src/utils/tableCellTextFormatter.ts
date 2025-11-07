export const tableCellTextFormatter = (string: string) => {
  if (string.length < 50) return string;

  return `${string.slice(0, 50)}...`;
};
