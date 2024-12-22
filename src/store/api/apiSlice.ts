import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "@/store/Reducers/authReducer";
import { RootState } from "@/store";
import toast from "react-hot-toast";

interface AuthResponse {
  user:{
    name: string
    avatar: string
    roles: number[]
    accessToken:string
  }
}
// https://ecommerceserver.alicoder.site/api/v1
// http://localhost:3000/api/v1
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ecommerceserver.alicoder.site/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { accessToken } = state.auth ; console.log("(apiSlice) access token to be sent >>",accessToken);
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`); //console.log('Authorization header set:', headers.get('authorization'));
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let response:any = await baseQuery(args, api, extraOptions)

  if (response?.error?.originalStatus === 500 || response?.error?.status == 500) {
    console.log("500 status error",response)
    toast.error("something went wrong")
    return response
  }

  if (response?.error?.originalStatus === 400 || response?.error?.status == 400){
    if(import.meta.env.ENV === "development")
      console.error("400 status error >>",response?.error)
    toast.error(response?.error?.data?.message)
    return response
  }
  if (response?.error?.originalStatus === 403 || response?.error?.status === 403) { 
    if(import.meta.env.ENV === "development")
      console.log("initial auth error >>", response?.error)
    
    const refreshResult = await baseQuery('/refresh/client', api,extraOptions);
    if(refreshResult.data) {
      const { user } = refreshResult.data as AuthResponse;
      if (user) {
        api.dispatch(setCredentials(user));
      } else {
        api.dispatch(setCredentials({ user: "", token: "" }));
      }
      response = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Chats', 'Messages','Sellers','Orders','WishList',"Products"], 
  endpoints: _ => ({}),
});

