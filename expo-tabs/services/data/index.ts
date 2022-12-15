import { Question, Snippet } from "./data.interface";
import { getQuestions } from "./get-questions";
import { getSnippet } from "./get-snippet";
import { listSnippets } from "./list-snippets";

export { getSnippet, listSnippets, getQuestions };

export type { Snippet, Question };
