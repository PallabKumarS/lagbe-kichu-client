/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { login, logout } from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API as string;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // set token in header here
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // send refresh token
    const res = await fetch(baseUrl + "/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const refreshTokenResult = await res.json();

    // checking if the refresh token expired or not
    if (refreshTokenResult?.data?.accessToken) {
      // store new access token in redux
      api.dispatch(login(refreshTokenResult.data.accessToken));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if refresh token is expired
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: [
    "users",
    "listings",
    "orders",
    "categories",
    "user",
    "PListings",
    "listing",
    "POrders",
    "order",
    "listings",
    "payment",
    "reviews",
  ],
});

export default baseApi;
