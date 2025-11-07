import type { TableColumn } from "@/types/tableTypes";
import { tableCellTextFormatter } from "@/utils/tableCellTextFormatter";

import { WORD_STATUS_NAME } from "./wordsConstants";

export const VOCABULARY_TABLE_COLUMNS: TableColumn[] = [
  {
    title: "СЛОВО/ФРАЗА",
    dataIndex: "word",
    key: "word",
    isSort: true,
    render: (text: string) => tableCellTextFormatter(text),
    className: "w-[13.71%]",
    classNameHeader: "w-[13.71%]",
  },
  {
    title: "ПЕРЕВОД",
    dataIndex: "translation",
    key: "translation",
    render: (text: string | null) => {
      return text ? tableCellTextFormatter(text) : "-";
    },
    className: "w-[17.71%]",
    classNameHeader: "w-[17.71%]",
  },
  {
    title: "ПРИМЕР",
    dataIndex: "context",
    key: "context",
    render: (text: string | null) => {
      return text ? `"${tableCellTextFormatter(text)}"` : "-";
    },
    className: "italic w-[27.56%]",
    classNameHeader: "w-[27.56%]",
  },
  {
    title: "СИНОНИМЫ",
    dataIndex: "synonyms",
    key: "synonyms",
    render: (text: string | null) => {
      return text ? tableCellTextFormatter(text) : "-";
    },
    className: "w-[18.89%]",
    classNameHeader: "w-[18.89%]",
  },
  {
    title: "СТАТУС",
    dataIndex: "ease_factor",
    key: "ease_factor",
    isFilter: true,
    render: (status: string) =>
      WORD_STATUS_NAME[status as unknown as keyof typeof WORD_STATUS_NAME],
    className: "grow",
    classNameHeader: "grow",
  },
];

export const VOCABULARY_POPOVER_VALUES = [
  { id: "0", label: "Новое" },
  { id: "-3", label: "На изучении" },
  { id: "-1", label: "Выучено" },
  { id: "-2", label: "Сложное" },
];
