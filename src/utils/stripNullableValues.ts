import type { NonEmpty } from "@/types/commonTypes";

export const stripNullableValues = <T extends Record<string, unknown>>(
  obj?: T
): NonEmpty<T> | undefined => {
  if (!obj) return undefined;

  const entries = Object.entries(obj).filter(
    ([, v]) => v !== undefined && v !== null
  );

  if (entries.length === 0) return undefined;

  return Object.fromEntries(entries) as NonEmpty<T>;
};
