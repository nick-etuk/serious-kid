import { snippet } from "./data.interface";
import { snippetDb } from "./snippet-db";

export function listSnippets(start: number, end: number): snippet[] {
  return snippetDb.slice(start, end + 1);
}
