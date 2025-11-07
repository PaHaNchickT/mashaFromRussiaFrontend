export type AvailableRules = "TEST_01_ALL_WORDS" | "VOC_01_BACKETS";

export type Praxis = {
  praxis_id: string;
  title: string;
  category: string;
  rules: AvailableRules[];
};

export type PatchPraxis = Partial<Praxis>;

export type GetWordsParams = {
  limit?: number;
  offset?: number;
};

export type GetWordsPraxisParams = GetWordsParams & {
  rules?: AvailableRules[];
};

export type PraxisResponse = {
  data: Praxis[];
  meta?: Record<string, unknown>;
};
