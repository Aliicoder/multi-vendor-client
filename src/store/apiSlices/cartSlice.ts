import { apiSlice } from "@/store/api/apiSlice";
export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserActiveCart: builder.query({
      query: () => `/carts`,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (credentials) => {
        return {
          url: `/carts/products/${credentials}`,
          method: "POST",
          body: credentials,
        };
      },
    }),
    deleteFromCart: builder.mutation({
      query: (credentials) => {
        return {
          url: `/carts/products/${credentials}`,
          method: "delete",
          body: credentials,
        };
      },
    }),
    cashCheckout: builder.mutation({
      query: (credentials) => {
        return {
          url: `/carts/cod`,
          method: "post",
          body: credentials,
        };
      },
    }),
    paypalCreateOrder: builder.mutation({
      query: (credentials) => {
        return {
          url: `/carts/paypal/create-order`,
          method: "post",
          body: credentials,
        };
      },
    }),
    paypalCaptureOrder: builder.mutation({
      query: (credentials) => {
        return {
          url: `/carts/paypal/capture-order`,
          method: "post",
          body: credentials,
        };
      },
    }),
  }),
});
export const {
  util,
  useGetUserActiveCartQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useCashCheckoutMutation,
  usePaypalCreateOrderMutation,
  usePaypalCaptureOrderMutation,
} = cartApiSlice;
