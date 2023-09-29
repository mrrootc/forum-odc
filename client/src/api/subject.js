import { api } from "./api";

const subjectApi = api.injectEndpoints({
    endpoints: (builder) => ({
        subject: builder.query({
            query: () => "/subject",
            providesTags: ["subject"]
        }),
        createSubject: builder.mutation({
            query: (body) => ({
                url: "/subject",
                method: "POST",
                body
            }),
            invalidatesTags: ["subject"]
        })
    }),
})

 export const { useSubjectQuery, useCreateSubjectMutation } = subjectApi