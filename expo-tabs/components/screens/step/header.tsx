import { View, Text, Button, useWindowDimensions } from 'react-native';
import { Snippet } from '../../../services/data/data.interface';
import { Step } from '../../../services/journey/journey.interface';

interface StepHeaderProps {
    stageId: number;
    stepNum: number;
    step: Step;
    pageContent: Snippet[];
    height: number;
    width: number;
}


export function StepHeader({ stageId, stepNum, pageContent, step, height, width }: StepHeaderProps) {
    return (
        <>
            <Text>Stage {stageId}   Step {stepNum}:
                Page snippets:{pageContent.reduce((a, i) => a + i.snippetId + ',', '')}
                Step snippets: {step.snippetIds.join(',')}
            </Text>
            <Text>Height: {height} Width: {width}</Text>
            </>
    )
}