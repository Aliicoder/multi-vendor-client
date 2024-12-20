import { apiSlice } from "@/store/api/apiSlice"
export const wishListApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWishList:builder.query({
      query:()=>`/wishlist`,
      providesTags:["WishList"]
    }),
    addToWishList:builder.mutation({
      query:(credentials)=>{ console.log("add to wishList credentials",credentials)
        return {
          url:`/wishlist`,
          method:'POST',
          body:credentials,
        };
      },
      invalidatesTags: ["WishList"], 
    }),
    deleteFromWishList:builder.mutation({
      query:(credentials)=>{ console.log("delete from wishList credentials",credentials)
        return {
          url:`/wishList`,
          method:'delete',
          body:credentials,
        };
      },
      invalidatesTags: ["WishList"], 
    }),
  
  })
})
export const {
  util,
  useGetWishListQuery,
  useAddToWishListMutation,
  useDeleteFromWishListMutation
} = wishListApiSlice