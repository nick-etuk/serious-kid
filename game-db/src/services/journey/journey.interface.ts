import { Snippet } from "../data";

interface Step {
  stepId: number;
  start: number;
  end: number;
  currentSnippetId: number;
  snippets: Snippet[];
}

export type { Step };
