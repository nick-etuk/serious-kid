import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StepPage } from './components/step';
import { buildStages, Step } from './services/journey';
import { log } from './utils';
import { nextStage as nextStage } from './services/journey/z-next-stage';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { student } from './services/student';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const display = {
        chars: 300
    };

    
    //const [stageNum, setstageNum] = useState(0);
    const stageNum = 0;  //useAppSelector(state => state.counter.value);
    /*
    useEffect(() => {
        log(0, '=>App.useEffect');
        getSteps(); //to-do fix this
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    */
    log(0, 'stageNum', stageNum, true);
    const subjectId = 'GEOG';
    const unitId = 1;

    const stages = buildStages(student.studentId, subjectId, unitId, 80);

    if (!isLoadingComplete) return null;

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <StepPage stage={stages[stageNum]} display={display} />
                <StatusBar />
            </SafeAreaProvider>
        </Provider>
    )
}
