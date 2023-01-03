import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "utils/constants";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
        }),
        getSnippets: builder.query({
            query: (subjectId) => `/snippets?s=${subjectId}`,
        }),
        getStack: builder.query({
            query: (subjectId) => `/stack?s=${subjectId}`,
        }),
        getQuestions: builder.query({
            query: (subjectId) => `/questions?s=${subjectId}`,
        }),
        getAnswers: builder.query({
            query: (subjectId) => `/answers?s${subjectId}`,
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetSnippetsQuery,
    useGetStackQuery,
    useGetQuestionsQuery,
    useGetAnswersQuery,
} = apiSlice;
