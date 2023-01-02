import { log } from "../../utils";
import { answerTable, questionTable, snippetTable } from "../data";
import { Answer, Question, Snippet } from "../data/data.interface";
import { Step } from "./journey.interface";
import { refineQuestions } from "./refine-questions";

export async function questionAnswers(q: Question) {
  const table: Answer[] = await answerTable();
  const result = table.filter(
    (a) =>
      a.subjectID === q.subjectID &&
      a.snippetId === q.snippetId &&
      a.questionID === q.questionID
  );
  return result;
}
