import { getSnippet, listSnippets } from "../data";
import { snippet } from "../data/data.interface";

export function nextPage(snippetID: number): snippet[] {
  return listSnippets(getSnippet(snippetID)?.id ?? 0, 3);
}
