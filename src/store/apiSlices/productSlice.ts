import { apiSlice } from "@/store/api/apiSlice";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (credentials) => ({
        url: `/products/${credentials.productId}`,
        method: "GET",
      }),
    }),
    getPaginatedProductsQ: builder.query({
      query: ({
        perPage,
        curPage,
        sort,
        _id,
        name,
        brand,
        shopName,
        outOfStock,
        category,
      }) => {
        const queryString = [
          _id && `_id=${_id}`,
          name && `name=${name}`,
          brand && `brand=${brand}`,
          shopName && `shopName=${shopName}`,
          outOfStock && `outOfStock=false`,
          category && `category=${category}`,
          curPage && `curPage=${curPage}`,
          perPage && `perPage=${perPage}`,
          sort && `sort=${sort}`,
        ]
          .filter(Boolean)
          .join("&&");
        console.log("products chunk 1 query string >>", queryString);
        return `/products/paginated?${queryString}`;
      },
      providesTags: ["Products"],
    }),
    getPaginatedProductsM: builder.mutation({
      query: ({
        perPage,
        curPage,
        sort,
        _id,
        name,
        shopName,
        outOfStock,
        category,
      }) => {
        const queryString = [
          _id && `_id=${_id}`,
          name && `name=${name}`,
          shopName && `shopName=${shopName}`,
          outOfStock && `outOfStock=false`,
          category && `category=${category}`,
          curPage && `curPage=${curPage}`,
          perPage && `perPage=${perPage}`,
          sort && `sort=${sort}`,
        ]
          .filter(Boolean)
          .join("&&");
        console.log("products chunk query string >>", queryString);
        return `/products/paginated?${queryString}`;
      },
    }),
    getFeaturedProducts: builder.query({
      query: () => {
        return {
          url: `/products/featuredProducts`,
          method: "GET",
        };
      },
    }),
    getFilteredProducts: builder.mutation({
      query: ({
        searchValue,
        curPage,
        perPage,
        minPrice,
        maxPrice,
        category,
        rating,
      }) => {
        const queryString = [
          searchValue && `searchValue=${searchValue}`,
          curPage && `curPage=${curPage}`,
          perPage && `perPage=${perPage}`,
          minPrice && `price[gte]=${minPrice}`,
          maxPrice && `price[lte]=${maxPrice}`,
          category && `category=${category}`,
          rating && `rating=${rating}`,
        ]
          .filter(Boolean)
          .join("&&");

        console.log("filtered products query string >>", queryString);

        return `/products/filteredProducts?${queryString}`;
      },
    }),
    getSearchedProducts: builder.query({
      query: ({ name }) => {
        const queryString = [name && `name=${name}`].filter(Boolean).join("&&");
        console.log("products search query string >>", queryString);
        return `/products/search?${queryString}`;
      },
    }),
    getAiSearchedProducts: builder.mutation({
      query: (credentials) => ({
        url: "/products/ai-search",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const {
  util,
  useGetProductQuery,
  useGetFeaturedProductsQuery,
  useGetAiSearchedProductsMutation,
  useGetFilteredProductsMutation,
  useGetPaginatedProductsMMutation,
  useGetPaginatedProductsQQuery,
  useGetSearchedProductsQuery,
} = productApiSlice;
