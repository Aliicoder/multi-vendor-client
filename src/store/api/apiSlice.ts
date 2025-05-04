import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "@/store/Reducers/authReducer";
import { RootState } from "@/store";
import { IAuthState, HttpStatus } from "@/types/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { accessToken } = state.auth;
    headers.set("authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let response: any = await baseQuery(args, api, extraOptions);
  console.log("response ", response);
  switch (response?.error?.originalStatus || response?.error?.status) {
    case HttpStatus.UNAUTHORIZED:
      api.dispatch(logout());
      break;
    case HttpStatus.FORBIDDEN:
      const refreshResponse = await baseQuery(
        "/users/refresh",
        api,
        extraOptions
      );

      if (
        refreshResponse?.data &&
        typeof refreshResponse.data === "object" &&
        "user" in refreshResponse.data
      ) {
        const user = refreshResponse.data.user as IAuthState;
        api.dispatch(setCredentials(user));
        response = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
      break;
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Chats",
    "Messages",
    "Sellers",
    "Orders",
    "WishList",
    "Products",
    "Cart",
  ],
  endpoints: (_) => ({}),
});
