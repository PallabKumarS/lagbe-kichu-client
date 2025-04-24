/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogComponent } from "@/components/shared/Dialog";
import LoadingData from "@/components/shared/LoadingData";
import {
  useCreatePaymentMutation,
  useDeleteOrderMutation,
  useGetPersonalOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import { userSelector } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TMongoose, TOrder } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { OrderTable } from "./OrderTable";

const OrderManagement = ({ query }: { query: Record<string, string> }) => {
  const { data: orders, isFetching } = useGetPersonalOrdersQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [selectedUser, setSelectedUser] = useState<(TOrder & TMongoose) | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");
  const user = useAppSelector(userSelector);

  const router = useRouter();

  const heads = ["Seller Info", "Listing Info", "Buyer Info", "Status"];

  if (user?.role === "buyer") {
    heads.push("Transaction");
    heads.push("Actions");
  }

  const handleStatus = async (order: TOrder, status?: string) => {
    const toastId = toast.loading("Updating order status...");
    try {
      const res = await updateOrderStatus({
        orderId: order.orderId,
        status: status as string,
      }).unwrap();
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
      console.error("Error updating order status:", error);
      toast.error(error.data.message, { id: toastId });
    }
  };

  const renderViewContent = (order: TOrder) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Ordered Items</h3>
          {order.listingId?.map((listing, idx) => (
            <div key={idx} className="border p-3 rounded-md">
              <p className="font-medium">{listing.title}</p>
              <p className="text-sm text-gray-500">{listing.category.title}</p>
              <p className="text-sm text-green-600 font-semibold">
                ${listing.price}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Buyer Info</h3>
          <p>Name: {order.buyerId.name}</p>
          <p>Email: {order.buyerId.email}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Order Info</h3>
          <p
            className={`font-medium ${
              order.status === "processing"
                ? "text-green-600"
                : order.status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Status: {order.status}
          </p>
          <p
            className={`font-medium ${
              order.transaction ? "text-green-600" : "text-red-600"
            }`}
          >
            Payment: {order.transaction ? "Paid" : "Unpaid"}
          </p>
        </div>
      </div>
    </div>
  );

  if (isFetching) return <LoadingData />;

  return (
    <div>
      <div>
        <OrderTable
          data={orders?.data}
          meta={orders?.meta}
          key={"order"}
          onStatusChange={handleStatus}
        />

        <DialogComponent
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          mode={modalMode}
          data={selectedUser}
          title={modalMode === "edit" ? "Edit Listing" : "Listing Details"}
          renderViewContent={renderViewContent}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
