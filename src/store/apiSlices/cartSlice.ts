import { apiSlice } from "@/store/api/apiSlice"
export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchActiveCart:builder.query({
      query:()=>`/cart`,
      providesTags:["Cart"]

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
    checkout:builder.mutation({
      query:(credentials)=>{ console.log("check out credentials ",credentials)
        return {
          url:`/cart/checkout`,
          method:'post',
          body:credentials,
        }
      }
    }),
  })
})
export const {
  util,
  useFetchActiveCartQuery,
  useAddProductAndFetchMutation,
  useDeleteProductAndFetchMutation,
  useCheckoutMutation
} = cartApiSlice