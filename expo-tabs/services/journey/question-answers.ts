import { log } from "utils";
import { answerTable, questionTable, snippetTable } from "services/data";
import { Answer, Question, Snippet } from "services/data/data.interface";
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
