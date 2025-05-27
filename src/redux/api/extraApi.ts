import baseApi from "./baseApi";

const extraApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all categories
    getStatistics: builder.query({
      query: () => ({
        url: "/statistics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatisticsQuery } = extraApi;
