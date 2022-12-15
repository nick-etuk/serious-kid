import { snippet } from "../../data/data.interface";
import { snippetDb } from "../../data/snippet-db";

export function getCurrentSnippet(studentID: number): snippet {
  return snippetDb[0];
}
