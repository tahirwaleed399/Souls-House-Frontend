import { backendUrl } from "@/utils/backendUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const otpApi : any= createApi({
  reducerPath: "otpApi",
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl, credentials:'include' }),
  endpoints: (builder) => ({
    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: `/send-otp`,
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSendOtpMutation ,useVerifyOtpMutation  } = otpApi;
