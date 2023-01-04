import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface scoreState {
    value: number;
}

const initialState: scoreState = {
    value: 0,
};

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        incrementScore: (state) => {
            state.value += 1;
        },
        decrementScore: (state) => {
            state.value -= 1;
        },
        resetScore: (state) => {
            state.value = 0;
        },
        setScore: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
        incrementScoreBy: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

export const {
    incrementScore,
    decrementScore,
    setScore,
    resetScore,
    incrementScoreBy,
} = scoreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getscore = (state: RootState) => state.score.value;

export default scoreSlice.reducer;
