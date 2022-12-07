import { getSnippet, listSnippets } from "../data";
import { snippet } from "../data/data.interface";

export function nextPage(snippetID: number): snippet[] {
  const s = getSnippet(snippetID);
  if (!s) return [];
  return listSnippets(s.id, s.id + 2);
}
