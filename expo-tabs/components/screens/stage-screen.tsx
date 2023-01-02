import { View, Text, Button } from 'react-native';

import { StageProps } from 'app.interface';
import { buildStages } from 'services/journey';
import {
    Stage, Step
} from 'services/journey/journey.interface';
import { student } from 'services/student';
import { useGetSnippetsQuery } from 'store/features/api/api-slice';
import { log } from 'utils';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setCurrentSnippetId } from 'store/current-snippet-id-slice';


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
    const {
        data: snippets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSnippetsQuery(student.currentSubjectId);
    
    let snippetTable;
    if (isLoading) {
        return <Text>Loading snippet table for stage screen...</Text>;
      } else if (isSuccess) {
        snippetTable = snippets.body;
      } else if (isError) {
        return <Text>{error.toString()}</Text>;
      }
    
    //log(0, 'snippetTable', snippetTable, true);
    const stages = buildStages(snippetTable, student);
    //log(0, 'stages', stages, true);
    
    return (
      <View style={{ flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }}>
            {stages.map((stage: { stageId: { toString: () => string; }; steps: Step[]; }) =>
                <Button key={stage.stageId.toString() } title={stage.stageId.toString()}
                    onPress={() => {
                        dispatch(setCurrentSnippetId(stage.steps[0].start));
                        navigation.navigate
                        ('Steps',
                            {
                                stage: stage,
                                display: display,
                            }
                        )
                    }
                    }
                />
            )}
      </View>
    );
}
