import { api } from "./api";

const messageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: () => "/message"
        })
    })
})

export const { useGetMessageQuery } = messageApi