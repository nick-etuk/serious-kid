import { Answer, Question } from "services/data";

interface GameProps {
    question: Question;
    answers: Answer[];
    questionIndex: number;
    questionCount: number;
    stageEnd: number;
    navigation: any;
}

export type { GameProps };
