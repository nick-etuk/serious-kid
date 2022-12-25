import { Question, Snippet } from "./data.interface";
import { dictionaryTable } from "./files/dictionary-table";
import { snippetLinkTable } from "./files/snippet-link-table";
//import { snippetTable } from "./files/snippet-table";
import { snippetTable } from "./http/snippet-table";
import { questionTable } from "./http/question-table";
import { answerTable } from "./http/answer-table";

import { getQuestions } from "./http/get-questions";
import { getSnippet } from "./get-snippet";
import { listSnippets } from "./list-snippets";

export {
  getSnippet,
  listSnippets,
  getQuestions,
  snippetTable,
  questionTable,
  answerTable,
  snippetLinkTable,
  dictionaryTable,
};

export type { Snippet, Question };
