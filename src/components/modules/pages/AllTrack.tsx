"use client";

import { TMongoose, TOrder } from "@/types";
import Link from "next/link";
import { CheckCircle, Eye, LucideBox, Trash2 } from "lucide-react";
import {
  useCreatePaymentMutation,
  useDeleteOrderMutation,
  useGetPersonalOrdersQuery,
} from "@/redux/api/orderApi";
import LoadingData from "@/components/shared/LoadingData";
import { PaginationComponent } from "@/components/shared/Pagination";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ConfirmationBox from "@/components/shared/ConfirmationBox";

const AllTrack = ({ query }: { query: Record<string, string> }) => {
  const router = useRouter();
  const { data, isFetching } = useGetPersonalOrdersQuery(query, {
    skip: !query,
    refetchOnMountOrArgChange: true,
  });

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async (order: TOrder) => {
    const toastId = toast.loading("Deleting order...");
    try {
      const res = await deleteOrder(order.orderId).unwrap();

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Error deleting order:", error);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleView = async (order: TOrder) => {
    router.push(`/dashboard/buyer/track/${order.orderId}`);
  };

  if (isFetching) return <LoadingData />;

  const orders = data?.data as (TOrder & TMongoose)[];

  const getStatusClassName = (currentStatus: TOrder["status"]) => {
    switch (currentStatus) {
      case "processing":
        return "bg-green-100 text-green-600 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-600 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  };

  const getStatusTransition = (currentStatus: TOrder["status"]) => {
    switch (currentStatus) {
      case "processing":
        return "animate-pulse";
      case "pending":
        return "animate-bounce";
      case "cancelled":
        return "animate-shake";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"
        )}
      >
        My Orders
      </h1>

      {orders?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No orders found. Start creating your first order!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {orders?.map((order) => (
            <div
              title={`${
                order.paymentType !== "cash" && order.status === "pending"
                  ? "Complete your payment to continue"
                  : ""
              }`}
              key={order?.orderId}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order?.orderId}
                  </h2>
                  <span
                    className={`font-bold px-3 py-1 rounded-full  ${getStatusClassName(
                      order?.status
                    )} ${
                      order.paymentType !== "cash"
                        ? `transition-all duration-750  ${getStatusTransition(
                            order.status
                          )}`
                        : ""
                    }`}
                  >
                    {order?.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  {order?.listingId?.map((listing, idx) => (
                    <div key={idx} className="flex items-center">
                      <LucideBox className="mr-2 text-blue-500 w-5 h-5" />
                      <span>{listing.title}</span>
                    </div>
                  ))}

                  {order?.status === "processing" && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-2 w-5 h-5" />
                      <span>Approved Order</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(order)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <ConfirmationBox
                    trigger={
                      <Button
                        size="sm"
                        variant="destructive"
                        className="hover:bg-red-300 transition-colors duration-500"
                      >
                        <Trash2 className="w-4 h-4 " />
                      </Button>
                    }
                    onConfirm={() => handleDelete(order)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <PaginationComponent meta={data?.data?.meta} />
    </div>
  );
};

export default AllTrack;
