import { apiSlice } from "@/store/api/apiSlice";
export const wishListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserWishList: builder.query({
      query: () => `/wishlists`,
      providesTags: ["WishList"],
    }),
    addToWishList: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/wishlists/products/${productId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["WishList"],
    }),
    deleteFromWishList: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/wishlists/products/${productId}`,
          method: "delete",
        };
      },
      invalidatesTags: ["WishList"],
    }),
  }),
});
export const {
  util,
  useGetUserWishListQuery,
  useAddToWishListMutation,
  useDeleteFromWishListMutation,
} = wishListApiSlice;
