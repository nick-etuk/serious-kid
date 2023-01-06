import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface healthState {
    value: number;
}

// Define the initial state using that type
const initialState: healthState = {
    value: 10,
};

export const healthSlice = createSlice({
    name: "health",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        incrementHealth: (state) => {
            state.value += 1;
        },
        decrementHealth: (state) => {
            state.value -= 1;
        },
        setHealth: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { incrementHealth, decrementHealth, setHealth } =
    healthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const gethealth = (state: RootState) => state.health.value;

export default healthSlice.reducer;
