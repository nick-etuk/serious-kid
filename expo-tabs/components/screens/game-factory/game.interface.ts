import { Answer, Question, Snippet } from "services/data";

interface GameProps {
    question: Question;
    answers: Answer[];
    questionIndex: number;
    questionCount: number;
    stageEnd: number;
    navigation: any;
    pageContent: Snippet[];
}

export type { GameProps };
