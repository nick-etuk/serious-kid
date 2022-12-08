interface Snippet {
  id: number;
  type: string;
  content: string;
}

interface Question {
  id: number;
  order: number;
  type: string;
  descr: string;
}
export type { Snippet, Question };
