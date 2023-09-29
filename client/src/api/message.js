import { api } from "./api";

const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: () => "/message",
            providesTags: ["messages"]
        }),
        createMessage: builder.mutation({
            query: (body) => ({
                url: "/message",
                method: "POST",
                body
            }),
            invalidatesTags: ["messages"]
        })
    })
})

export const { useGetMessageQuery, useCreateMessageMutation} = messageApi