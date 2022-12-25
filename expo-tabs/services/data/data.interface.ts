interface Snippet {
  subjectId: string;
  topicId: number;
  snippetId: number;
  snippetType: string;
  descr: string;
}

interface Question {
  subjectId: string;
  snippetId: number;
  questionId: number;
  questionType: string;
  descr: string;
  answers: Answer[];
}

interface Answer {
  subjectId: string;
  snippetId: number;
  questionId: number;
  answerId: number;
  descr: string;
}

export type { Snippet, Question, Answer };
