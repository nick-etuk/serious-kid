import { Question, Snippet } from "./data.interface";
import { dictionaryTable } from "./files/dictionary-table";
import { snippetLinkTable } from "./files/snippet-link-table";
import { snippetTable } from "./files/snippet-table";

import { getQuestions } from "./get-questions";
import { getSnippet } from "./get-snippet";
import { listSnippets } from "./list-snippets";

export {
  getSnippet,
  listSnippets,
  getQuestions,
  snippetTable,
  snippetLinkTable,
  dictionaryTable,
};

export type { Snippet, Question };
