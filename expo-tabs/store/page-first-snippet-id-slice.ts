import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface pageFirstSnippetIdState {
    value: number;
}

// Define the initial state using that type
const initialState: pageFirstSnippetIdState = {
    value: 0,
};

export const pageFirstSnippetIdSlice = createSlice({
    name: "pageFirstSnippetId",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setPageFirstSnippetId: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setPageFirstSnippetId } = pageFirstSnippetIdSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getPageFirstSnippetId = (state: RootState) =>
    state.pageFirstSnippetId.value;

export default pageFirstSnippetIdSlice.reducer;
