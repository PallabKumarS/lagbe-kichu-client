"use client";

import { DialogComponent } from "@/components/shared/Dialog";
import { TableComponent } from "@/components/shared/Table";
import { userSelector } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hook";
import { deleteRequest, updateRequestStatus } from "@/services/RequestService";
import { TMeta, TMongoose, TOrder } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const RequestManagement = ({
  requests,
  meta,
}: {
  requests: (TOrder & TMongoose)[];
  meta: TMeta;
}) => {
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

  const cellProperties: (keyof TOrder)[] = [
    "sellerId",
    "listingId",
    "buyerId",
    "status",
    "transaction",
  ];

  const handleDelete = async (order: TOrder & TMongoose) => {
    const toastId = toast.loading("Deleting order...");
    try {
      const res = await deleteRequest(order.orderId);

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

  const handleView = async (order: TOrder & TMongoose) => {
    router.push(`/dashboard/buyer/track/${order.orderId}`);
  };

  const handleStatus = async (order: TOrder & TMongoose, status?: string) => {
    const toastId = toast.loading("Updating order status...");
    try {
      const res = await updateRequestStatus(order.orderId, status as string);
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
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const renderViewContent = (order: TOrder & TMongoose) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Landlord Info</h3>
          <p>Name: {order.sellerId.name}</p>
          <p>Email: {order.sellerId.email}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">buyer Info</h3>
          <p>Name: {order.buyerId.name}</p>
          <p>Email: {order.buyerId.email}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Listing Details</h3>
          <p>Location: {order.listingId.title}</p>
          <p>Price: ${order.listingId.price}</p>
          <p>Category: {order.listingId.category}</p>
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

  return (
    <div>
      <div>
        <TableComponent
          cellProperties={cellProperties}
          data={requests}
          heads={heads}
          meta={meta}
          caption="Order Management"
          onDelete={handleDelete}
          onView={handleView}
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

export default RequestManagement;
