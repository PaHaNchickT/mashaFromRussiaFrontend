import z from "zod";

import type { SimpleFormFields } from "@/UI/Forms/SimpleForm";

export const WORD_STATUS_NAME = {
  0: "Новое",
  1: "На изучении",
  2: "На изучении",
  3: "На изучении",
  4: "На изучении",
  [-1]: "Выучено",
  [-2]: "Сложное",
};

export const WORD_FORM_FIELDS: SimpleFormFields[] = [
  {
    name: "word",
    label: "СЛОВО/ФРАЗА",
    placeholder: "введите текст",
    type: "text",
  },
  {
    name: "translation",
    label: "ПЕРЕВОД",
    placeholder: "введите текст",
    type: "text",
  },
  {
    name: "context",
    label: "ПРИМЕР",
    placeholder: "введите текст",
    type: "text",
  },
  {
    name: "synonyms",
    label: "СИНОНИМЫ",
    placeholder: "введите текст",
    type: "text",
  },
  {
    name: "transcription",
    label: "ТРАНСКРИПЦИЯ",
    placeholder: "введите текст",
    type: "text",
  },
  {
    name: "association",
    label: "ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ",
    placeholder: "введите текст",
    type: "text",
  },
];

export const WORD_FORM_SCHEMA = z.object({
  word: z.string().min(1, "Введите текст"),
  translation: z.string(),
  context: z.string(),
  synonyms: z.string(),
  transcription: z.string(),
  association: z.string(),
});
