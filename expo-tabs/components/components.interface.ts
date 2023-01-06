import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Question } from "services/data";
import { Answer } from "services/data/data.interface";
import { Step } from "services/journey";
import { Stage } from "services/journey/journey.interface";

interface AppProps {
    step: Step;
    questions: Question[];
    display: Display;
}

interface StageProps {
    stages: Stage[];
}

interface StepProps {
    stage: Stage;
    display: Display;
}

interface QuestionProps {
    questions: Question[];
    answers: Answer[];
    stepStart: number;
}

interface LayoutProps {
    snippetList: string;
    stepNum: number;
}

interface ButtonProps {
    onPress: ((event: GestureResponderEvent) => void) | undefined;
    key?: number;
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
    StageProps,
    StepProps,
    QuestionProps,
    LayoutProps,
    ButtonProps,
    Display,
};
