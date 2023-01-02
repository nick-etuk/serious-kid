import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../utils/constants";

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
    getQuestions: builder.query({
      query: () => "/questions",
    }),
    getAnswers: builder.query({
      query: () => "/answers",
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSnippetsQuery,
  useGetQuestionsQuery,
  useGetAnswersQuery,
} = apiSlice;
