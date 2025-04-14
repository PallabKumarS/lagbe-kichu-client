import baseApi from "@/redux/api/baseApi";
import { IReview } from "@/types"; // Adjust if needed

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all reviews
    getAllReviews: builder.query({
      query: (query: Record<string, string>) => ({
        url: `/reviews`,
        method: "GET",
        params: query,
      }),
      providesTags: ["reviews"],
    }),

    // Get all reviews for a specific listing
    getAllReviewsByListingId: builder.query({
      query: (listingId: string) => ({
        url: `/reviews/${listingId}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),

    // Create a review
    createReview: builder.mutation({
      query: (data: IReview) => ({
        url: `/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews", "listing"],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({
        reviewId,
        data,
      }: {
        reviewId: string;
        data: Partial<IReview>;
      }) => ({
        url: `/reviews/${reviewId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reviews", "listing"],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (reviewId: string) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews", "listing"],
    }),
  }),
});

export const {
  useGetAllReviewsByListingIdQuery,
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;
