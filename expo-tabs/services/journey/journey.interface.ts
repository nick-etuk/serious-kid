import { Answer, Question, Snippet } from "services/data";
import { Dictionary } from "services/dictionary";

interface Step {
    stepNum: number;
    start: number;
    end: number;
    snippets: Snippet[];
    questions: Question[];
    answers: Answer[];
    dictionary: Dictionary[];
}
interface Stage {
    stageId: number;
    start: number;
    end: number;
    steps: Step[];
}

export type { Step, Stage };
