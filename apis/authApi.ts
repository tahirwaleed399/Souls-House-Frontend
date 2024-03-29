import { backendUrl } from "@/utils/backendUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
// Define a service using a base URL and expected endpoints

const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const refreshResult = await baseQuery("/refresh-tokens", api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
    }
  }
  return result;
};
export const authApi: any = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (data) => ({
        url: `/send-otp`,
        method: "POST",
        body: data,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: `/sign-in`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: `/activate-user`,
        method: "POST",
        body: data,
      }),
    }),
    refreshTokens: builder.query({
      query: () => ({
        url: `/refresh-tokens`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useActivateUserMutation,
  useRefreshTokensQuery,
  useSignInMutation,
  useLogoutMutation,
} = authApi;
