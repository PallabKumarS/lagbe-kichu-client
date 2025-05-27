import baseApi from "./baseApi";

const extraApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => ({
        url: "/statistics/detailed",
        method: "GET",
      }),
    }),

    getDetailedStatistics: builder.query({
      query: () => ({
        url: "/statistics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatisticsQuery, useGetDetailedStatisticsQuery } =
  extraApi;
