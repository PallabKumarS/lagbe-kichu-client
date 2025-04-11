"use client";

import { DialogComponent } from "@/components/shared/Dialog";
import { TableComponent } from "@/components/shared/Table";
import { userSelector } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hook";
import { deleteRequest, updateRequestStatus } from "@/services/RequestService";
import { TMeta, TMongoose, TRequest } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const RequestManagement = ({
  requests,
  meta,
}: {
  requests: (TRequest & TMongoose)[];
  meta: TMeta;
}) => {
  const [selectedUser, setSelectedUser] = useState<
    (TRequest & TMongoose) | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");
  const user = useAppSelector(userSelector);

  const router = useRouter();

  const heads = ["Land Owner Info", "Listing Info", "Tenant Info", "Status"];

  if (user?.role === "tenant") {
    heads.push("Transaction");
    heads.push("Actions");
  }

  const cellProperties: (keyof TRequest)[] = [
    "sellerId",
    "listingId",
    "buyerId",
    "status",
    "transaction",
  ];

  const handleDelete = async (request: TRequest & TMongoose) => {
    const toastId = toast.loading("Deleting request...");
    try {
      const res = await deleteRequest(request.requestId);

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
      console.error("Error deleting request:", error);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleView = async (request: TRequest & TMongoose) => {
    router.push(`/dashboard/tenant/track/${request.requestId}`);
  };

  const handleStatus = async (
    request: TRequest & TMongoose,
    status?: string
  ) => {
    const toastId = toast.loading("Updating request status...");
    try {
      const res = await updateRequestStatus(
        request.requestId,
        status as string
      );
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
      console.error("Error updating request status:", error);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const renderViewContent = (request: TRequest & TMongoose) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Landlord Info</h3>
          <p>Name: {request.sellerId.name}</p>
          <p>Email: {request.sellerId.email}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Tenant Info</h3>
          <p>Name: {request.buyerId.name}</p>
          <p>Email: {request.buyerId.email}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Listing Details</h3>
          <p>Location: {request.listingId.title}</p>
          <p>Price: ${request.listingId.price}</p>
          <p>Bedrooms: {request.listingId.bedroomNumber}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Request Info</h3>
          <p
            className={`font-medium ${
              request.status === "approved"
                ? "text-green-600"
                : request.status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Status: {request.status}
          </p>
          <p
            className={`font-medium ${
              request.transaction ? "text-green-600" : "text-red-600"
            }`}
          >
            Payment: {request.transaction ? "Paid" : "Unpaid"}
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
          caption="Request Management"
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
