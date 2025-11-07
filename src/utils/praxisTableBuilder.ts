import type { Praxis } from "@/types/praxisTypes";

// TODO: переписать функцию без моков
type Category = "vocabulary" | "listening" | "writing" | "speaking" | "key";
type Column = Record<Category, string> &
  Partial<Record<`${Category}Data`, Praxis>>;

function isCategory(x: string): x is Category {
  return ["vocabulary", "listening", "writing", "speaking"].includes(x);
}

export const praxisTableBuilder = (data: Praxis[]): Column[] => {
  const columns: Column[] = [];

  data.forEach((item, index) => {
    const defaultItem: Column = {
      key: `row-${index}`,
      vocabulary: "В разработке",
      listening: "В разработке",
      writing: "В разработке",
      speaking: "В разработке",
    };

    if (!isCategory(item.category)) {
      console.warn("Unknown category, skipping", item.category);
      return; // или continue (в forEach — return эквивалентен continue)
    }

    const cat = item.category; // narrowed to Category
    defaultItem[cat] = item.title;

    const dataKey = `${cat}Data` as `${Category}Data`;
    defaultItem[dataKey] = item;

    columns.push(defaultItem);
  });

  return columns;
};
