import { api } from "./api";

const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (id) => `/category/subject/${id}`,
             providesTags: ["categories"]
        }),
        createCategory: builder.mutation({
            query: (body) => ({
                url: "/category",
                method: "POST",
                body
            }),
            invalidatesTags: ["categories"]
        })
    })
})

export const { useGetCategoryQuery, useCreateCategoryMutation } = categoriesApi