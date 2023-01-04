import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface questionIndexState {
    value: number;
}

const initialState: questionIndexState = {
    value: 0,
};

export const questionIndexSlice = createSlice({
    name: "questionIndex",
    initialState,
    reducers: {
        incrementQuestionIndex: (state) => {
            state.value += 1;
        },
        decrementQuestionIndex: (state) => {
            state.value -= 1;
        },
        resetQuestionIndex: (state) => {
            state.value = 0;
        },
        setQuestionIndex: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const {
    incrementQuestionIndex,
    decrementQuestionIndex,
    setQuestionIndex,
    resetQuestionIndex,
} = questionIndexSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getQuestionIndex = (state: RootState) => state.questionIndex.value;

export default questionIndexSlice.reducer;
