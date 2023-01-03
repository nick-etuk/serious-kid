import { Answer, Question, Snippet } from "services/data";

interface Step {
    stepNum: number;
    start: number;
    end: number;
    snippets: Snippet[];
    questions: Question[];
    answers: Answer[];
}
interface Stage {
    stageId: number;
    start: number;
    end: number;
    steps: Step[];
}

export type { Step, Stage };
