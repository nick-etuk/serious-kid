import React, { StrictMode } from 'react';
import { Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import { log } from './utils';

import { Provider } from 'react-redux';
import { persistor, store } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react'

import { StepPage } from 'components/screens/step/step';
import { StageScreen } from 'components/screens/stage-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Admin } from 'components/screens/admin';
import { Activity } from 'components/screens/activity/activity';

const Stack = createNativeStackNavigator();

export default function App() {
    const isLoadingComplete = useCachedResources();
    if (!isLoadingComplete) return null;

    return (
        <StrictMode>
            <Provider store={store}>
                { /* <PersistGate loading={<Text>Loading from local storage...</Text>} persistor={persistor}> */}
                    <NavigationContainer>
                        <Stack.Navigator>
                            { /*<Stack.Screen name="Admin" component={Admin}/> */ }
                            <Stack.Screen name="Stages" component={StageScreen}/>
                            <Stack.Screen name="Step" component={StepPage} />
                            <Stack.Screen name="Activity" component={Activity} />
                        </Stack.Navigator>
                    </NavigationContainer>
                { /* </PersistGate> */}
            </Provider>
        </StrictMode>
    )
}
