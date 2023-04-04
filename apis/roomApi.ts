import { backendUrl } from "@/utils/backendUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
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
export const roomApi: any = createApi({
  reducerPath: "roomApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: `/create-room`,
        method: "POST",
        body: data,
      }),
    }),  getRooms: builder.query({
      query: () => ({
        url: `/get-rooms`,
        method: "GET"
      }),
    }),

   
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
useCreateRoomMutation,
useGetRoomsQuery
} = roomApi;
