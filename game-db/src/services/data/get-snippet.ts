import { Snippet } from "./data.interface";
import { snippetDb } from "./snippet-json";

export function getSnippet(snippetId: number): Snippet | undefined {
  return snippetDb.find((x) => x.snippetId === snippetId);
}
