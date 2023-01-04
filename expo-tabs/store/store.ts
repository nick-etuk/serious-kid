import { configureStore } from "@reduxjs/toolkit";
import stepNumReducer from "./step-num-slice";
import showQuestionsReducer from "./show-questions-slice";
import currentSnippetIdReducer from "./current-snippet-id-slice";
import questionIndexReducer from "./question-index-slice";
import scoreReducer from "./score-slice";

import { apiSlice } from "./features/api/api-slice";

export const store = configureStore({
    reducer: {
        stepNum: stepNumReducer,
        showQuestions: showQuestionsReducer,
        currentSnippetId: currentSnippetIdReducer,
        questionIndex: questionIndexReducer,
        score: scoreReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
