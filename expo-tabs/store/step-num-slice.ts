import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface stepNumState {
    value: number;
}

// Define the initial state using that type
const initialState: stepNumState = {
    value: 0,
};

export const stepNumSlice = createSlice({
    name: "stepNum",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        stepNumIncrement: (state) => {
            state.value += 1;
        },
        stepNumDecrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        stepNumIncrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        setStepNum: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const {
    stepNumIncrement,
    stepNumDecrement,
    setStepNum,
    stepNumIncrementByAmount,
} = stepNumSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getStepNum = (state: RootState) => state.stepNum.value;

export default stepNumSlice.reducer;
