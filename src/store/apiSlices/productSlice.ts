import { apiSlice } from "@/store/api/apiSlice"
const DEFAULT_LIMIT = 8, DEFAULT_PAGE = 1;
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    FetchProduct:builder.query({
      query:credentials=>({
        url:`/product/${credentials.productId}`,
        method:'GET',
      })
    }),
    FetchProductsChunkQ:builder.query({ 
      query:({perPage,curPage,sort,_id,name,shopName,outOfStock,category})=>{
        let sortBy = sort ? Object.values(sort) : [] 
        const queryString = [
           curPage ? `curPage=${curPage}` : `curPage=${DEFAULT_PAGE}`,
           perPage ? `perPage=${perPage}` : `perPage=${DEFAULT_LIMIT}`,
           sortBy && `sortBy=${sortBy}`,
           _id && `_id=${_id}`,
           name && `name=${name}`,
           shopName && `shopName=${shopName}`,
           outOfStock && `outOfStock=false`,
           category && `category=${category}`
        ]
          .filter(Boolean)
          .join("&&");
          console.log("product query string >>",queryString);
        return `/product/chunk?${queryString}`
      },
      providesTags:["Products"]
    }),
    FetchProductsChunkM:builder.mutation({ 
      query:({perPage,curPage,sort,_id,name,shopName,outOfStock,category})=>{
        let sortBy = sort ? Object.values(sort) : [] 
        const queryString = [
          curPage ? `curPage=${curPage}` : `curPage=${DEFAULT_PAGE}`,
          perPage ? `perPage=${perPage}` : `perPage=${DEFAULT_LIMIT}`,
          sortBy && `sortBy=${sortBy}`,
          _id && `_id=${_id}`,
          name && `name=${name}`,
          shopName && `shopName=${shopName}`,
          outOfStock && `outOfStock=false`,
          category && `category=${category}`
        ]
          .filter(Boolean)
          .join("&&");
          console.log("product query string >>",queryString);
        return `/product/chunk?${queryString}`
      },
    }),
    FetchFeaturedProducts:builder.query({
      query:()=>{
        return{
          url:`/product/featuredProducts`,
          method:'GET',
        }
      }  
    }),
    FetchFilteredProducts:builder.mutation({
      query:credentials=>{
        console.log("credentials >>",credentials)
        return{
          url:`/product/filteredProducts?searchValue=${credentials?.searchValue}&&curPage=${credentials?.curPage}&&perPage=${credentials?.perPage}&&price[gte]=${credentials?.queryParams?.minPrice}&&price[lte]=${credentials?.queryParams?.maxPrice}&&category=${credentials?.queryParams?.category}&&rating=${credentials?.queryParams?.rating}`,
          method:'GET',
        }
      }  
    }),
    FetchSearchedProducts:builder.mutation({
      query:credentials=>{
        console.log("credentials >>",credentials)
        return{
          url:`/product/search?searchValue=${credentials.searchValue}&&category=${credentials.category}`,
          method:'GET',
        }
      }  
    }),
  })
})
export const {
  util,
 useFetchProductsChunkMMutation,
 useFetchFeaturedProductsQuery,
 useFetchProductsChunkQQuery,
 useFetchProductQuery,
 useFetchFilteredProductsMutation,
 useFetchSearchedProductsMutation
} = productApiSlice