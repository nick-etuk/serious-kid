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
    let answerTable:Answer[] = [];;

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
        snippetTable = stackResponse.body.snippets;
        questionTable = stackResponse.body.questions;
        answerTable = stackResponse.body.answers;
    } else if (isError) {
        return <Text>{error.toString()}</Text>;
    }
    /*
    const {
        data: questionsResponse,
        isLoading: questionsLoading,
        isSuccess: questionsSuccess,
        isError: questionsError,
        error: questionsMsg
    } = useGetQuestionsQuery(student.currentSubjectId);
    
    if (questionsLoading) {
        return <Text>Loading questions...</Text>;
    } else if (questionsSuccess) {
        questionTable = questionsResponse.body;
    } else if (questionsError) {
        return <Text>{questionsMsg.toString()}</Text>;
    }
    const {
        data: answersResponse,
        isLoading: answersLoading,
        isSuccess:answersSuccess,
        isError: answersError,
        error: answersMsg
    } = useGetAnswersQuery(student.currentSubjectId);
    
    if (answersLoading) {
        return <Text>Loading answers...</Text>;
    } else if (answersSuccess) {
        answerTable = answersResponse.body;
    } else if (answersError) {
        return <Text>{answersMsg.toString()}</Text>;
    }
    */
    const stages = buildStages(snippetTable, questionTable, answerTable, student);
    //log(0, 'stages', stages, true);
    
    return (
      <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }}>
            {stages.map(stage =>
                <Button key={stage.stageId.toString()} title={stage.stageId.toString()}
                    onPress={() => {
                        dispatch(setCurrentSnippetId(stage.steps[0].start));
                        dispatch(setStepNum(0));
                        navigation.navigate('Step', { stage: stage })
                    }}
                />
            )}
      </View>
    );
}
