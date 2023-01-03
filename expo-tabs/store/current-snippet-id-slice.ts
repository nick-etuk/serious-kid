import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface currentSnippetIdState {
  value: number;
}

const initialState: currentSnippetIdState = {
  value: 1,
};

export const currentSnippetIdSlice = createSlice({
  name: "currentSnippetId",
  initialState,
  reducers: {
    setCurrentSnippetId: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentSnippetId } = currentSnippetIdSlice.actions;

export const selectShowQuestionCount = (state: RootState) =>
  state.stepNum.value;

export default currentSnippetIdSlice.reducer;
