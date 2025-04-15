import baseApi from "@/redux/api/baseApi";
import { IListing } from "@/types"; // update with actual types

const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all listings
    getAllListings: builder.query({
      query: (query: Record<string, unknown>) => {
        const queryString = new URLSearchParams(
          query as Record<string, string>
        ).toString();

        return {
          url: `/listings?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["listing"],
    }),

    // Get single listing
    getSingleListing: builder.query({
      query: (listingId: string) => ({
        url: `/listings/${listingId}`,
        method: "GET",
      }),
      providesTags: ["listing"],
    }),

    // Get personal listings
    getPersonalListings: builder.query({
      query: (query: Record<string, unknown>) => {
        const queryString = new URLSearchParams(
          query as Record<string, string>
        ).toString();

        return {
          url: `/listings/personal?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["PListings"],
    }),

    // Create listing
    createListing: builder.mutation({
      query: (data: Partial<IListing>) => ({
        url: `/listings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["listings", "PListings", , "listing"],
    }),

    // Update listing
    updateListing: builder.mutation({
      query: ({
        listingId,
        data,
      }: {
        listingId: string;
        data: Partial<IListing>;
      }) => ({
        url: `/listings/${listingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["listings", "PListings", "listing"],
    }),

    // Update listing status
    updateListingStatus: builder.mutation({
      query: (listingId: string) => ({
        url: `/listings/status/${listingId}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["listings", "PListings", "listing"],
    }),

    // Delete listing
    deleteListing: builder.mutation({
      query: (listingId: string) => ({
        url: `/listings/${listingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["listings", "PListings"],
    }),

    // update listing discount
    addDiscount: builder.mutation({
      query: ({
        listingId,
        data,
      }: {
        listingId: string;
        data: {
          discount: number;
          discountStartDate: Date;
          discountEndDate: Date;
        };
      }) => ({
        url: `/listings/discount/${listingId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["listings", "PListings", "listing"],
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useLazyGetAllListingsQuery,
  useGetSingleListingQuery,
  useGetPersonalListingsQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useUpdateListingStatusMutation,
  useDeleteListingMutation,
  useAddDiscountMutation
} = listingApi;

export default listingApi;
