import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./step-num-slice";
import showQuestionsReducer from "./show-questions-slice";
import currentSnippetIdReducer from "./current-snippet-id-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    showQuestions: showQuestionsReducer,
    currentSnippetId: currentSnippetIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
