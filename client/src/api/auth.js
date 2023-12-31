import { api } from "./api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "auth/signin",
                method: "POST",
                body
            }),
            invalidatesTags: ["auth"]
        }),
        register: builder.mutation({
            query: (body) => ({
              url: "auth/signup",
              method: "POST",
              body,
            }),
        }),
        validate: builder.mutation({
            query: (body) => ({
                url: "auth/validation",
                method: "PATCH",
                body,
            }),
          }),
    })
})


export const { useLoginMutation, useRegisterMutation, useValidateMutation } = authApi;