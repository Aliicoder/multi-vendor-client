import { apiSlice } from "@/store/api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/users/google-login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: "/users/logout",
          method: "PATCH",
        };
      },
    }),
  }),
});
export const {
  useRefreshMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApiSlice;
