import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ShowQuestionsState {
  value: boolean;
}

const initialState: ShowQuestionsState = {
  value: false,
};

export const showQuestionsSlice = createSlice({
  name: "showingQuestions",
  initialState,
  reducers: {
    showQuestionsAction: (state) => {
      state.value = true;
    },
    hideQuestionsAction: (state) => {
      state.value = false;
    },
  },
});

export const { showQuestionsAction, hideQuestionsAction } =
  showQuestionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectShowQuestionCount = (state: RootState) =>
  state.stepNum.value;

export default showQuestionsSlice.reducer;
