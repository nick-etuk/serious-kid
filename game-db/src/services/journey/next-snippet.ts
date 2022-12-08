import { Snippet } from "../data";
import { snippetDb } from "../data/snippet-json";

export function nextSnippet(current: number): Snippet | undefined {
  const currentID = snippetDb[current].id;
  return snippetDb.find((x) => x.id === currentID + 1);
}
