import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StepPage } from './components/step';
import { Step } from './services/journey';
import { log } from './utils';
import { nextLap } from './services/pagination/next-lap';

import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    let steps: Step[] = [];

    function getSteps() {
        log(0, '=>getSteps');
        steps = nextLap(0, 80);
        //log(0, 'steps', steps, true);
    }
    
    const display = {
        chars: 300
    };

    
    //const [stepNum, setStepNum] = useState(0);
    const stepNum = 0;  //useAppSelector(state => state.counter.value);
    /*
    useEffect(() => {
        log(0, '=>App.useEffect');
        getSteps(); //to-do fix this
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    */
    log(0, 'stepNum', stepNum, true);
    getSteps();

    if (!isLoadingComplete) return null;

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <StepPage steps={steps} display={display} />
                <StatusBar />
            </SafeAreaProvider>
        </Provider>
    )
}
