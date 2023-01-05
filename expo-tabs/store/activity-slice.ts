import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface activityState {
    value: string;
}

const initialState: activityState = {
    value: "TUTOR",
};

export const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        setActivity: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        resetActivity: (state) => {
            state.value = initialState.value;
        },
    },
});

export const { setActivity, resetActivity } = activitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getActivity = (state: RootState) => state.activity.value;

export default activitySlice.reducer;
