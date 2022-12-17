import { Snippet } from "./data.interface";
import { snippetTable } from "./files/snippet-table";

export function getSnippet(snippetId: number): Snippet | undefined {
  return snippetTable.find((x) => x.snippetId === snippetId);
}
