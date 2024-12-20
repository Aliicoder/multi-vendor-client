import { apiSlice } from "@/store/api/apiSlice"
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    refresh:builder.mutation({
      query:()=>({
        url:"/refresh/client",
        method:"GET",
      })
    }),
    login:builder.mutation({
      query:credentials=>({
        url:'/client/login',
        method: 'POST',
        body:{...credentials}
      })
    }),

    signup:builder.mutation({
      query:credentials=>({
        url:'/client/signup',
        method:'POST',
        body:{...credentials}
      })
    }), 
 
    logout:builder.mutation({
      query:()=>{
        return{
          url:'/client/logout',
          method:'PATCH',
        }
      }
    }),
  })
})
export const {
 useRefreshMutation,
 useLoginMutation,
 useSignupMutation,
 useLogoutMutation,
} = authApiSlice