import { Question, Snippet } from "../data";

interface Step {
  stepNum: number;
  start: number;
  end: number;
  currentSnippetId: number;
  snippets: Snippet[];
  questions: Question[];
}

export type { Step };
