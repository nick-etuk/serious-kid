import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./step-num-slice";
import showQuestionsReducer from "./show-questions-slice";
import currentSnippetIdReducer from "./current-snippet-id-slice";
import { apiSlice } from "./features/api/api-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    showQuestions: showQuestionsReducer,
    currentSnippetId: currentSnippetIdReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
