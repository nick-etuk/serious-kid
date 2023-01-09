import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import stageNumReducer, { stageNumState } from "./stage-num-slice";
import stepNumReducer from "./step-num-slice";
import showQuestionsReducer from "./show-questions-slice";
import currentSnippetIdReducer from "./current-snippet-id-slice";
import questionIndexReducer from "./question-index-slice";
import activityReducer from "./activity-slice";
import pageHistoryReducer from "./page-history-slice";
import pageFirstSnippetIdReducer from "./page-first-snippet-id-slice";
import pageLastSnippetIdReducer from "./page-last-snippet-id-slice";
import healthReducer from "./health-slice";
import livesReducer from "./lives-slice";
import scoreReducer from "./score-slice";

import { apiSlice } from "./features/api/api-slice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    stateReconciler: hardSet,
};

const rootReducer = combineReducers({
    //stageNum: persistReducer<stageNumState, any>(persistConfig, stageNumReducer),
    stageNum: stageNumReducer,

    stepNum: stepNumReducer,
    showQuestions: showQuestionsReducer,
    currentSnippetId: currentSnippetIdReducer,
    questionIndex: questionIndexReducer,
    score: scoreReducer,
    health: healthReducer,
    lives: livesReducer,
    activity: activityReducer,
    pageHistory: pageHistoryReducer,
    pageFirstSnippetId: pageFirstSnippetIdReducer,
    pageLastSnippetId: pageLastSnippetIdReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

/*
const reducers = combineReducers({
    ui: persistReducer<UiState, any>(persistConfig, uiReducer),
    api: apiReducer,
});
 
*/
/*
export const store = configureStore({
    reducer: {
        stageNum: stageNumReducer,
        stepNum: stepNumReducer,
        showQuestions: showQuestionsReducer,
        currentSnippetId: currentSnippetIdReducer,
        questionIndex: questionIndexReducer,
        score: scoreReducer,
        health: healthReducer,
        lives: livesReducer,
        activity: activityReducer,
        pageHistory: pageHistoryReducer,
        pageFirstSnippetId: pageFirstSnippetIdReducer,
        pageLastSnippetId: pageLastSnippetIdReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
*/

//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: rootReducer,
    //devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
