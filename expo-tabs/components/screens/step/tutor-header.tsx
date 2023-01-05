import { View, Text, Button, useWindowDimensions } from 'react-native';
import { Snippet } from 'services/data/data.interface';
import { Step } from 'services/journey/journey.interface';
import { log } from 'utils';

interface TutorHeaderProps {
    stageId: number;
    stepNum: number;
    step: Step;
    pageContent: Snippet[];
    height: number;
    width: number;
}


export function TutorHeader({ stageId, stepNum, pageContent, step, height, width }: TutorHeaderProps) {
    const log_level = 0;

    const stepSnippetIds = step.snippets.reduce((a, i) => a + i.snippetId + ',', '');
    const pageSnippetIds = pageContent.reduce((a, i) => a + i.snippetId + ',', '');
    log(log_level, 'Stage', stageId, true);
    log(log_level, 'stepNum', stepNum, true);
    log(log_level, 'Step', step, true);
    log(log_level, 'Page snippets', pageSnippetIds, true);

    return (
        <>
            <View style={{ flexDirection:'row' }} >
                <Text style={{width:100}}>Stage: {stageId}</Text>
                <Text style={{width:100}}>Step: {stepNum}</Text>
                <Text style={{marginLeft:50}}>Snippets: {stepSnippetIds}</Text>
                <Text style={{marginLeft:50}}>Page snippets: {pageSnippetIds}</Text>
            </View>
            <View style={{ flexDirection:'row' }} >
                <Text style={{width:100}}>Height: {height}</Text>
                <Text style={{width:100}}>Width: {width}</Text>
            </View>
            </>
    )
}