import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface livesState {
    value: number;
}

const initialState: livesState = {
    value: 3,
};

export const livesSlice = createSlice({
    name: "lives",
    initialState,
    reducers: {
        incrementLives: (state) => {
            state.value += 1;
        },
        decrementLives: (state) => {
            state.value -= 1;
        },
        setLives: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementLives, decrementLives, setLives } = livesSlice.actions;
export const getlives = (state: RootState) => state.lives.value;
export default livesSlice.reducer;
