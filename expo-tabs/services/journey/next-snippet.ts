import { getSnippet, Snippet } from "services/data";
import { snippetTable } from "services/data/files/snippet-table";

export function nextSnippetV1(current: number): Snippet | undefined {
  const currentID = snippetTable[current].snippetId;
  return snippetTable.find((x) => x.snippetId === currentID + 1);
}

export function nextSnippetv2(currentSnippetId: number): Snippet | undefined {
  if (currentSnippetId == 0) return getSnippet(1);
  return getSnippet(currentSnippetId + 1);
}

export function nextSnippet(
  snippetTable: Snippet[],
  currentSnippetId: number
): Snippet | undefined {
  //if (!currentSnippetId || currentSnippetId === 0) return snippetTable[0];
  const result = snippetTable.find((x) => x.snippetId === currentSnippetId + 1); //*todo aint necessarily so
  //if (!result) return snippetTable[0];
  return result;
}
