import { apiSlice } from "@/store/api/apiSlice"
const DEFAULT_LIMIT = 8, DEFAULT_PAGE = 1 
export const sellerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    FetchSellersChunkQ:builder.query({ 
      query:({name,curPage,perPage,sort})=>{
        let sortBy = sort ? Object.values(sort) : [] 
        const queryString = [
          curPage ? `curPage=${curPage}` : `curPage=${DEFAULT_PAGE}` ,
          perPage ? `perPage=${perPage}` : `perPage=${DEFAULT_LIMIT}`,
          sortBy && `sortBy=${sortBy}`,
          name && `name=${name}`,
        ]
          .filter(Boolean)
          .join("&&");
          console.log("shops query string >>",queryString);
        return `/client/shopsChunk?${queryString}`
      },
      providesTags:["Products"]
    }),
    FetchSellersChunkM:builder.mutation({ 
      query:({perPage,curPage,sort,name,})=>{
        let sortBy = sort ? Object.values(sort) : [] 
        const queryString = [
          curPage ? `curPage=${curPage}` : `curPage=${DEFAULT_PAGE}`,
          perPage ? `perPage=${perPage}` : `perPage=${DEFAULT_LIMIT}`,
          sortBy ? `sortBy=${sortBy} ` : `sortBy=[] ` ,
          name && `name=${name}`,
       ]
         .filter(Boolean)
         .join("&&");
          console.log("shops query string >>",queryString);
        return `/client/shopsChunk?${queryString}`
      },
    }),
  })
})
export const {
  util,
  useFetchSellersChunkQQuery,
  useFetchSellersChunkMMutation
} = sellerApiSlice