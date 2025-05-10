import { apiSlice } from "@/store/api/apiSlice";
export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMobileOtp: builder.mutation({
      query: (credentials) => ({
        url: `/users/send-mobile-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyMobileOtp: builder.mutation({
      query: (credentials) => ({
        url: `/users/verify-mobile-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
    sendEmailOtp: builder.mutation({
      query: (credentials) => ({
        url: `/users/send-email-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: (credentials) => ({
        url: `/users/verify-email-otp`,
        method: "POST",
        body: credentials,
      }),
    }),
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
  useSendMobileOtpMutation,
  useVerifyMobileOtpMutation,
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useDeleteAddressMutation,
  useSetAddressAsDefaultMutation,
} = clientApiSlice;
