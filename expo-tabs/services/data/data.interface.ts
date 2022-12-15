interface Snippet {
  snippetId: number;
  snippetType: string;
  descr: string;
  questions: Question[];
}

interface Question {
  snippetId: number;
  questionSeq: number;
  questionType: string;
  descr: string;
  answers: Answer[];
}

interface Answer {
  answerSeq: number;
  descr: string;
}

export type { Snippet, Question, Answer };
