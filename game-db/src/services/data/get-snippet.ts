import { snippet } from "./data.interface";
import { snippetDb } from "./snippet-json";

export function getSnippet(id: number): snippet | undefined {
  return snippetDb.find((x) => x.id === id);
}
