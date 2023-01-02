import { log } from "utils";
import { getSnippet, questionTable, snippetTable } from "services/data";
import { Question, Snippet } from "services/data/data.interface";
import { Step } from "./journey.interface";
import { refineQuestions } from "./refine-questions";

export async function stepQuestions(step: Step) {
  let result: Question[] = [];
  const table: Question[] = await questionTable();
  for (const snippetId of step.snippetIds) {
    const s = getSnippet(snippetId);
    if (!s) continue;
    const questions = table.filter(
      (q) => q.subjectID === s.subjectID && q.snippetId === snippetId
    );
    result = questions.concat(questions);
  }
  return refineQuestions(result);
}
