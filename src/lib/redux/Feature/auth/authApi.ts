import baseApi from "../../API/baseApi";
import { tags } from "../../API/tag";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login a user
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.USER],
    }),

    // register a user
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.USER],
    }),

    // get user profile
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [tags.USER],
    }),

    // update user profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tags.USER],
    }),

    // change user password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tags.USER],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
