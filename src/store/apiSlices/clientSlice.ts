import { apiSlice } from "@/store/api/apiSlice"
export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addAddress:builder.mutation({
      query:credentials=>({
        url:'/client/address',
        method:'POST',
        body:{...credentials}
      })
    }), 
    editAddress:builder.mutation({
      query:credentials=>({
        url:'/client/address',
        method:'PATCH',
        body:{...credentials}
      })
    }),  
    deleteAddress:builder.mutation({
      query:credentials=>({
        url:'/client/address',
        method:'DELETE',
        body:{...credentials}
      })
    }),  
  })
})
export const {
  useAddAddressMutation,
  useEditAddressMutation,
  useDeleteAddressMutation
} = clientApiSlice