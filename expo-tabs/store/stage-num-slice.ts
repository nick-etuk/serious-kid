import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface stageNumState {
    value: number;
}

// Define the initial state using that type
const initialState: stageNumState = {
    value: 0,
};

export const stageNumSlice = createSlice({
    name: "stageNum",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        stageNumIncrement: (state) => {
            state.value += 1;
        },
        stageNumDecrement: (state) => {
            state.value -= 1;
        },
        setStageNum: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { stageNumIncrement, stageNumDecrement, setStageNum } =
    stageNumSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getStageNum = (state: RootState) => state.stageNum.value;

export default stageNumSlice.reducer;
