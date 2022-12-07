import { snippet } from "../../data/data.interface";
import { snippetDb } from "../../data/snippet-json";

export function getStudentPos(studentID: number): number {
  return snippetDb[0].id;
}
