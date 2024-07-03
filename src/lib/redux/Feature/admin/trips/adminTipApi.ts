import baseApi from "@/lib/redux/API/baseApi";
import { tags } from "@/lib/redux/API/tag";

const adminTripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all trips
    getAllTrip: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();

        if (limit) {
          params.append("limit", limit);
        }
        if (page) {
          params.append("page", page);
        }

        return {
          url: "/trips",
          method: "GET",
          params,
        };
      },
      providesTags: [tags.TRAVEL, tags.TRIP],
    }),

    // update trip
    updateTrip: builder.mutation({
      query: ({ id, trip }) => ({
        url: `/trips/${id}`,
        method: "PUT",
        body: trip,
      }),

      invalidatesTags: [tags.TRAVEL, tags.TRIP],
    }),

    // delete trip
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [tags.TRAVEL, tags.TRIP],
    }),
  }),
});

export const {
  useGetAllTripQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
} = adminTripApi;
