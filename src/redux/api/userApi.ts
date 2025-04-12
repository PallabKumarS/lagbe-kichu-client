import baseApi from "@/redux/api/baseApi";
import { TUser } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: (query: Record<string, unknown>) => {
        const queryString = new URLSearchParams(
          query as Record<string, string>
        ).toString();

        return {
          url: `/users?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    // Get single user
    getSingleUser: builder.query({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Get current (me)
    getMe: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Update user
    updateUser: builder.mutation({
      query: ({ userId, data }: { userId: string; data: Partial<TUser> }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users", "user"],
    }),

    // Update user status
    updateUserStatus: builder.mutation({
      query: (userId: string) => ({
        url: `/users/status/${userId}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["users", "user"],
    }),

    // Update user role
    updateUserRole: builder.mutation({
      query: ({ userId, role }: { userId: string; role: string }) => ({
        url: `/users/role/${userId}`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["users", "user"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;
