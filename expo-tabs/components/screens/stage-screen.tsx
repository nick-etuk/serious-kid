import { View, Text, Button } from 'react-native';

import { StageProps } from 'components/components.interface';
import { buildStages } from 'services/journey';
import {
    Stage, Step
} from 'services/journey/journey.interface';
import { student } from 'services/student';
import { useGetAnswersQuery, useGetQuestionsQuery, useGetSnippetsQuery, useGetStackQuery } from 'store/features/api/api-slice';
import { log } from 'utils';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setCurrentSnippetId } from 'store/current-snippet-id-slice';
import { hideQuestionsAction } from 'store/show-questions-slice';
import { setStepNum } from 'store/step-num-slice';
import { Answer, Question, Snippet } from 'services/data';
import { resetActivity } from 'store/activity-slice';
import { setStageNum } from 'store/stage-num-slice';
import { Dictionary } from 'services/dictionary';

const stateSubjectId = 'GEOG';
const stateUnitId = 1;
const stateStudentId = student.studentId;    


//const stages = buildStages(stateStudentId, stateSubjectId, stateUnitId, 80);
const display = {
    chars: 300
};

  
export function StageScreen({ route, navigation }: any /*todo remove 'any' see TabOnescreen */) {
    //const { stages, display } = route.params;
    const dispatch = useAppDispatch();

    let snippetTable:Snippet[] = [];
    let questionTable:Question[] = [];
    let answerTable: Answer[] = [];
    let dictionaryTable: Dictionary[] = [];

    const {
        data: stackResponse,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetStackQuery(student.currentSubjectId);
    
    if (isLoading) {
        return <Text>Loading paragraphs, questions and answers...</Text>;
    } else if (isSuccess) {
         snippetTable= stackResponse.body.snippets;
         questionTable = stackResponse.body.questions;
         answerTable = stackResponse.body.answers;
         dictionaryTable = stackResponse.body.dictionary;
    } else if (isError) {
        return <Text>{error.toString()}</Text>;
    }
    
    const stages = buildStages(snippetTable, questionTable, answerTable, dictionaryTable, student);
    
    return (
      <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }}>
            {stages.map(stage =>
                <Button key={stage.stageId.toString()} title={stage.stageId.toString()}
                    onPress={() => {
                        dispatch(setCurrentSnippetId(stage.steps[0].start));
                        dispatch(setStageNum(0));
                        dispatch(setStepNum(0));
                        dispatch(resetActivity())
                        navigation.navigate('Activity', { stage: stage })
                    }}
                />
            )}
      </View>
    );
}
