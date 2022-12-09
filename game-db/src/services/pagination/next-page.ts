import { getSnippet, listSnippets } from "../data";
import { Snippet } from "../data/data.interface";

export async function nextPage(snippetID: number): Promise<Snippet[]> {
  const s = await getSnippet(snippetID);
  if (!s) return await Promise.resolve([]);
  return await Promise.resolve(listSnippets(s.id, s.id + 2));
}
