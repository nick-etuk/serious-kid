import { GestureResponderEvent } from "react-native";
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
  stepStart: number;
}

interface LayoutProps {
  snippetList: string;
  stepNum: number;
}

interface ButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
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

export type {
  AppProps,
  StepProps,
  QuestionProps,
  LayoutProps,
  ButtonProps,
  Display,
};
