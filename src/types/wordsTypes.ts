import type { ResponseMetaData } from "./commonTypes";

export type Word = {
  word_id: string;
  user_id: string;
  word: string;
  transcription?: string;
  translation?: string;
  context?: string;
  synonyms?: string;
  association?: string;
  ease_factor: number;
  created_at: string;
  last_reviewed_at?: string;
  next_review_at?: string;
  tags?: string[];
};

export type WordTable = Word & {
  key: string;
};

export type WordsResponse = {
  data: Word[];
  meta: ResponseMetaData;
};

export type NewWord = Pick<
  Word,
  | "word"
  | "transcription"
  | "translation"
  | "context"
  | "synonyms"
  | "association"
>;

export type PatchWord = Partial<
  Pick<
    Word,
    | "word"
    | "transcription"
    | "translation"
    | "context"
    | "synonyms"
    | "association"
    | "ease_factor"
    | "last_reviewed_at"
    | "next_review_at"
    | "tags"
  >
>;

export type GetWordsParams = {
  ease_factor?: number;
  ease_factor_min?: number;
  ease_factor_max?: number;
  limit?: number;
  offset?: number;
  qsearch?: string;
  sortBy?: keyof NewWord;
  order?: "asc" | "desc";
};

export type ImportWordsResponse = {
  inserted: number;
  word_ids: string[];
};

export type FilterWordState = {
  dataIndex: "ease_factor";
  value: string | null;
};
