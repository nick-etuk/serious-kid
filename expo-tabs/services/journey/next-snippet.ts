import { getSnippet, Snippet } from "../data";
import { snippetTable } from "../data/files/snippet-table";

export function znextSnippet(current: number): Snippet | undefined {
  const currentID = snippetTable[current].snippetId;
  return snippetTable.find((x) => x.snippetId === currentID + 1);
}

export function nextSnippet(currentSnippetId: number): Snippet | undefined {
  if (currentSnippetId == 0) return getSnippet(1);
  return getSnippet(currentSnippetId + 1);
}
