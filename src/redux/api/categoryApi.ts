import baseApi from "@/redux/api/baseApi";
import { TCategory } from "@/types";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getAllCategories: builder.query({
      query: (query: Record<string, unknown> | undefined) => {
        const queryString = new URLSearchParams(
          query as Record<string, string>
        ).toString();

        return {
          url: `/categories?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["categories"],
    }),

    // Create category
    createCategory: builder.mutation({
      query: (data: Partial<TCategory>) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({
        categoryId,
        data,
      }: {
        categoryId: string;
        data: Partial<TCategory>;
      }) => ({
        url: `/categories/${categoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
