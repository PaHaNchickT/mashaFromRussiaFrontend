export type NonEmpty<T> = {
  [K in keyof T as T[K] extends null | undefined | "" ? never : K]: T[K];
};

export type ProgressBarHandle = {
  start: () => void;
  finish: () => void;
  reset: () => void;
};

export type ResponseMetaData = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type PluralizatorValues = "слово";
export type PluralizatorEndings = Record<PluralizatorValues, string[]>;

export type ErrorResponse = { status: number; data: { error: string } };

export type SpeakFn = (
  text: string,
  rate?: number | undefined,
  pitch?: number | undefined
) => void;
