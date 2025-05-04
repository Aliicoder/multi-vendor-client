import { apiSlice } from "@/store/api/apiSlice";
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: ({ userId, limit, page }) => {
        const queryParams = [
          userId && `userId=${userId}`,
          limit && `limit=${limit}`,
          page && `page=${page}`,
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
