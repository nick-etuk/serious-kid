import { Question } from "./services/data";
import { Step } from "./services/journey";

interface AppProps {
  step: Step;
  questions: Question[];
  display: Display;
}

interface StepProps {
  steps: Step[];
  display: Display;
}

interface QuestionProps {
  questions: Question[];
}

interface LayoutProps {
  snippetList: string;
  stepNum: number;
}

interface Display {
  height?: {
    pixels: number;
    chars: number;
  };
  width?: {
    pixels: number;
    chars: number;
  };
  chars: number;
}

export type { AppProps, StepProps, QuestionProps, LayoutProps, Display };
