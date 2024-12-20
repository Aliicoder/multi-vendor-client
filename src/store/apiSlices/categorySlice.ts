import { apiSlice } from "@/store/api/apiSlice"
const DEFAULT_LIMIT = 8, DEFAULT_PAGE = 1;
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    FetchCategoriesChunkQ:builder.query({ 
      query:({curPage,perPage,sortBy,_id,name})=>{
        const queryString = [
          curPage ? `curPage=${curPage}` : `curPage=${DEFAULT_PAGE}` ,
          perPage ? `perPage=${perPage}` : `perPage=${DEFAULT_LIMIT}`,
          sortBy && `sortBy=${sortBy}`,
          _id && `_id=${_id}`,
          name && `name=${name}`
        ]
          .filter(Boolean)
          .join("&&");
        console.log("category query string >>",queryString);
        return `/category/chunk?${queryString}`
      },
    }),
    FetchCategoriesChunkM:builder.mutation({ 
      query:({curPage,perPage,sortBy,_id,name})=>{
        const queryString = [
          curPage ? `curPage=${curPage}` : `curPage=${DEFAULT_PAGE}` ,
          perPage ? `perPage=${perPage}` : `perPage=${DEFAULT_LIMIT}`,
          sortBy && `sortBy=${sortBy}`,
          _id && `_id=${_id}`,
          name && `name=${name}`
        ]
          .filter(Boolean)
          .join("&&");
        console.log("category query string >>",queryString);
        return `/category/chunk?${queryString}`
      },
    }),
   
  })
})
export const {
  util,
 useFetchCategoriesChunkQQuery,
 useFetchCategoriesChunkMMutation,
} = categoryApiSlice