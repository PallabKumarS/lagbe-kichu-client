import baseApi from "@/redux/api/baseApi";
import { IOrder } from "@/types"; // adjust as needed

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders
    getAllOrders: builder.query({
      query: (query: Record<string, unknown>) => {
        const queryString = new URLSearchParams(
          query as Record<string, string>
        ).toString();

        return {
          url: `/orders?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),

    // Get single order
    getSingleOrder: builder.query({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    // Get personal orders
    getPersonalOrders: builder.query({
      query: (query: Record<string, unknown>) => {
        const queryString = new URLSearchParams(
          query as Record<string, string>
        ).toString();

        return {
          url: `/orders/personal?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["POrders"],
    }),

    // Create order
    createOrder: builder.mutation({
      query: (data: Partial<IOrder>) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders", "POrders", "order"],
    }),

    // Update order
    updateOrder: builder.mutation({
      query: ({
        orderId,
        data,
      }: {
        orderId: string;
        data: Partial<IOrder>;
      }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [
        "orders",
        "POrders",
        "order",
        "listings",
        "PListings",
        "listing",
      ],
    }),

    // Update order status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }: { orderId: string; status: string }) => ({
        url: `/orders/status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [
        "orders",
        "POrders",
        "order",
        "listings",
        "PListings",
        "listing",
      ],
    }),

    // Delete order
    deleteOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders", "POrders", "order"],
    }),

    // Create payment
    createPayment: builder.mutation({
      query: (orderId: string) => ({
        url: `/orders/create-payment/${orderId}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["orders", "POrders", "order", "payment"],
    }),

    // Verify payment
    verifyPayment: builder.query({
      query: (paymentId: string) => ({
        url: `/orders/verify-payment/${paymentId}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useGetPersonalOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useCreatePaymentMutation,
  useVerifyPaymentQuery,
} = orderApi;

export default orderApi;
