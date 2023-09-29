import { api } from "./api";

const subjectApi = api.injectEndpoints({
    endpoints: (builder) => ({
        subject: builder.query({
            query: () => "/subject"
        }),
        createSubject: builder.mutation({
            query: () =>
        })
    }),
})

 export const { useSubjectQuery } = subjectApi