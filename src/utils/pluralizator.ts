import type {
  PluralizatorEndings,
  PluralizatorValues,
} from "@/types/commonTypes";

const PLURALIZATOR_ENDINGS: PluralizatorEndings = {
  слово: ["слово", "слова", "слов"],
};

export const pluralizator = (word: PluralizatorValues, number: number) => {
  const absNum = Math.abs(number);
  const lastTwo = absNum % 100;
  const last = absNum % 10;

  let formIndex;
  if (lastTwo >= 11 && lastTwo <= 14) {
    formIndex = 2; // "слов"
  } else if (last === 1) {
    formIndex = 0; // "слово"
  } else if (last >= 2 && last <= 4) {
    formIndex = 1; // "слова"
  } else {
    formIndex = 2; // "слов"
  }

  return PLURALIZATOR_ENDINGS[word][formIndex];
};
