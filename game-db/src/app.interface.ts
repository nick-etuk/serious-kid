import { Question } from "./services/data";
import { Step } from "./services/journey";

interface AppProps {
  step: Step;
  questions: Question[];
  display: Display;
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

export type { AppProps, Display };
