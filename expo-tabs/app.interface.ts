import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Question } from "./services/data";
import { Step } from "./services/journey";
import { Stage } from "./services/journey/journey.interface";

interface AppProps {
  step: Step;
  questions: Question[];
  display: Display;
}

interface StepProps {
  stage: Stage;
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
  style: StyleProp<ViewStyle>;
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
