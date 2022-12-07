import { snippet } from "../../data.interface";
import { snippetDb } from "../../snippet-db";

export function getCurrentSnippet(studentID: number): snippet {
  return snippetDb[0];
}
