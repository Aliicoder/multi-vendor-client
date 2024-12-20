import { apiSlice } from "@/store/api/apiSlice"
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchOrders:builder.query({
      query:()=> `/order`,
      providesTags:["Orders"]
    }),
  })
})
export const {
  util,
  useFetchOrdersQuery
} = orderApiSlice