import { apiSlice } from "@/store/api/apiSlice";
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedCategoriesM: builder.mutation({
      query: ({ name, level, perPage, curPage, sort }) => {
        const queryString = [
          name && `name=${name}`,
          level && `level=${level}`,
          perPage && `perPage=${perPage}`,
          curPage && `curPage=${curPage}`,
          sort && `sort=${sort}`,
        ]
          .filter(Boolean)
          .join("&&");
        console.log(queryString);
        return `/categories/paginated?${queryString}`;
      },
    }),
    getPaginatedCategoriesQ: builder.query({
      query: ({ name, level, perPage, curPage, sort }) => {
        const queryString = [
          name && `name=${name}`,
          level && `level=${level}`,
          perPage && `perPage=${perPage}`,
          curPage && `curPage=${curPage}`,
          sort && `sort=${sort}`,
        ]
          .filter(Boolean)
          .join("&&");
        console.log(queryString);
        return `/categories/paginated?${queryString}`;
      },
    }),
  }),
});
export const {
  util,
  useGetPaginatedCategoriesMMutation,
  useGetPaginatedCategoriesQQuery,
} = categoryApiSlice;
