import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface pageLastSnippetState {
    value: number;
}

// Define the initial state using that type
const initialState: pageLastSnippetState = {
    value: 0,
};

export const pageLastSnippetIdSlice = createSlice({
    name: "pageLastSnippet",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setPageLastSnippetId: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setPageLastSnippetId } = pageLastSnippetIdSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPageLastSnippet = (state: RootState) =>
    state.pageLastSnippetId.value;

export default pageLastSnippetIdSlice.reducer;
