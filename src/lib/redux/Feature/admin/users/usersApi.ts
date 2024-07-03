import baseApi from "../../../API/baseApi";
import { tags } from "../../../API/tag";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => {
        const query = new URLSearchParams();

        if (page) {
          query.append("page", page);
        }
        if (limit) {
          query.append("limit", limit);
        }

        return {
          url: "/users",
          method: "GET",
          params: query,
        };
      },

      providesTags: [tags.USER],
    }),

    // update user status
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [tags.USER],
    }),

    // change user role
    changeUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/role/${id}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: [tags.USER],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useChangeUserRoleMutation,
} = userApi;
