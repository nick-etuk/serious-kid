import { Answer, Question, Snippet } from "services/data";
import { Dictionary } from "services/dictionary";

interface GameProps {
    question: Question;
    answers: Answer[];
    questionIndex: number;
    questionCount: number;
    stageEnd: number;
    navigation: any;
    pageContent: Snippet[];
}

interface TutorProps {
    pageContent: Snippet[];
    dictionary: Dictionary[];
}

export type { TutorProps, GameProps };
