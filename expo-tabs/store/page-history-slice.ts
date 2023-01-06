import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface pageHistoryState {
    value: number[];
}

const initialState: pageHistoryState = {
    value: [],
};

export const pageHistorySlice = createSlice({
    name: "pageHistory",
    initialState,
    reducers: {
        pushPageHistory: (state, action: PayloadAction<number>) => {
            state.value.push(action.payload);
        },
        popPageHistory: (state) => {
            state.value.pop();
        },
        resetPageHistory: (state) => {
            state.value = initialState.value;
        },
    },
});

export const { pushPageHistory, popPageHistory, resetPageHistory } =
    pageHistorySlice.actions;

export const getpageHistory = (state: RootState) => state.pageHistory.value;

export default pageHistorySlice.reducer;
