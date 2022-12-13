import { getSnippet, Snippet } from "../data";
import { snippetDb } from "../data/snippet-json";

export function znextSnippet(current: number): Snippet | undefined {
  const currentID = snippetDb[current].snippetId;
  return snippetDb.find((x) => x.snippetId === currentID + 1);
}

export function nextSnippet(currentSnippetId: number): Snippet | undefined {
  if (currentSnippetId == 0) return getSnippet(1);
  return getSnippet(currentSnippetId + 1);
}
