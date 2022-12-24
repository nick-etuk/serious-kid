import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StepPage } from './components/step';
import { StageScreen } from './components/screens/stage-screen';
import { buildStages, Step } from './services/journey';
import { log } from './utils';
import { nextStage as nextStage } from './services/journey/z-next-stage';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { student } from './services/student';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const display = {
        chars: 300
    };

    
    //const [stageNum, setstageNum] = useState(0);
    const stateStageNum = 0;  //useAppSelector(state => state.counter.value);
    /*
    useEffect(() => {
        log(0, '=>App.useEffect');
        getSteps(); //to-do fix this
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    */
    log(0, 'stageNum', stateStageNum, true);
    const stateSubjectId = 'GEOG';
    const stateUnitId = 1;
    const stateStudentId = student.studentId;    

    //const stateStages = buildStages(stateStudentId, stateSubjectId, stateUnitId, 80);

    if (!isLoadingComplete) return null;

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Stages" component={StageScreen}/>
                    <Stack.Screen name="Steps" component={StepPage} />
                </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    )
}
