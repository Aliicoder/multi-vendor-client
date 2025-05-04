import { apiSlice } from "@/store/api/apiSlice";
export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials.userId}/addresses`,
        method: "POST",
        body: credentials,
      }),
    }),
    updateAddress: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials.userId}/addresses/${credentials.addressId}`,
        method: "PATCH",
        body: credentials,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials.userId}/addresses/${credentials.addressId}`,
        method: "DELETE",
        body: credentials,
      }),
    }),
    setAddressAsDefault: builder.mutation({
      query: (credentials) => ({
        url: `/users/${credentials.userId}/addresses/default`,
        method: "PATCH",
        body: credentials,
      }),
    }),
  }),
});
export const {
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetAddressAsDefaultMutation,
} = clientApiSlice;
