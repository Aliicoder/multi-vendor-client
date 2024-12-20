import { apiSlice } from "@/store/api/apiSlice"
export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchActiveCart:builder.query({
      query:()=>`/cart`
    }),
    addProductAndFetch:builder.mutation({
      query:(credentials)=>{ //console.log("add to cart credentials",credentials)
        return {
          url:`/cart/addAndFetch`,
          method:'POST',
          body:credentials,
        }
      }
    }),
    deleteProductAndFetch:builder.mutation({
      query:(credentials)=>{ console.log("add to cart credentials",credentials)
        return {
          url:`/cart/deleteAndFetch`,
          method:'delete',
          body:credentials,
        }
      }
    }),
    cashOnDeliveryPayment:builder.mutation({
      query:(credentials)=>{ console.log("add to cart credentials",credentials)
        return {
          url:`/cart/cashOnDeliveryPayment`,
          method:'post',
          body:credentials,
        }
      }
    }),
  })
})
export const {
  useFetchActiveCartQuery,
  useAddProductAndFetchMutation,
  useDeleteProductAndFetchMutation,
  useCashOnDeliveryPaymentMutation
} = cartApiSlice