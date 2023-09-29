import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:5000" ,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            const tokenData = JSON.parse(token)?.token;
            if (token) {
                headers.set("authorization", `Bearer ${tokenData}`);
            }
            return headers;
        },
    }),
    tagTypes: ['auth', 'subject', 'categories', 'messages'],
    endpoints: () => ({}),
});
