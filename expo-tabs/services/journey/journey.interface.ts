import { Question, Snippet } from "services/data";

interface Step {
  stepNum: number;
  start: number;
  end: number;
  //currentSnippetId: number;
  snippetIds: number[];
}
interface Stage {
  stageId: number;
  steps: Step[];
}

export type { Step, Stage };
