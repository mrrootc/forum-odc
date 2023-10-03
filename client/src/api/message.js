import { api } from "./api";

const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: (id) => `/message/${id}`,
            providesTags: ["messages"]
        }),
        createMessage: builder.mutation({
            query: (body) => ({
                url: "/message/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["messages"]
        })
    })
})

export const { useGetMessageQuery, useCreateMessageMutation} = messageApi