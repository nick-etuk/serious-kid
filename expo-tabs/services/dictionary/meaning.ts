import { dictionaryTable } from "services/data";

export function meaning(word: string | undefined): string {
  for (const w of dictionaryTable) if (w.word === word) return w.meaning;
  return "";
}
