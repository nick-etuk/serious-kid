import { configureStore } from "@reduxjs/toolkit";
import stageNumReducer from "./stage-num-slice";
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
