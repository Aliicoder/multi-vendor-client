import { apiSlice } from "@/store/api/apiSlice";
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: ({ userId, perPage, curPage }) => {
        const queryParams = [
          userId && `userId=${userId}`,
          perPage && `perPage=${perPage}`,
          curPage && `curPage=${curPage}`,
        ]
          .filter(Boolean)
          .join("&&");
        console.log("queryParams", queryParams);
        return `/orders/paginated?${queryParams}`;
      },
      providesTags: ["Orders"],
    }),
  }),
});
export const { util, useFetchOrdersQuery } = orderApiSlice;
