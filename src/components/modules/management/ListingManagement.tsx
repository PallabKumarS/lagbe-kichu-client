"use client";

import ListingForm from "@/components/forms/ListingForm";
import { DialogComponent } from "@/components/shared/Dialog";
import ImageSlider from "@/components/shared/ImageSlider";
import { TableComponent } from "@/components/shared/Table";
import { deleteListing, updateListingStatus } from "@/services/ListingService";
import { TListing, TMeta, TMongoose } from "@/types";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TProps = {
  listings: (TListing & TMongoose)[];
  meta: TMeta;
};

const ListingManagement = ({ listings, meta }: TProps) => {
  const [selectedUser, setSelectedUser] = useState<
    (TListing & TMongoose) | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");

  const router = useRouter();

  const heads = [
    "House Location",
    "Rent Price",
    "Bedroom Number",
    "Status",
    "Actions",
  ];
  const cellProperties: (keyof TListing)[] = [
    "title",
    "price",
    "bedroomNumber",
    "isAvailable",
  ];

  const handleDelete = async (listing: TListing & TMongoose) => {
    const toastId = toast.loading("Deleting listing...");
    try {
      const res = await deleteListing(listing.listingId);

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
      console.error("Error deleting listing:", error);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleView = async (listing: TListing & TMongoose) => {
    router.push(`/listings/${listing.listingId}`);
  };

  const handleStatus = async (listing: TListing & TMongoose) => {
    const toastId = toast.loading("Updating listing status...");
    try {
      const res = await updateListingStatus(listing.listingId);
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
      console.error("Error updating listing status:", error);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleEdit = async (listing: TListing & TMongoose) => {
    setSelectedUser(listing);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const renderViewContent = (listing: TListing & TMongoose) => (
    <div className="space-y-4">
      <div className="relative h-48 w-full rounded-lg overflow-hidden">
        <ImageSlider images={listing.images} variant="card" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Location</h3>
          <p>{listing.title}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Price</h3>
          <p className="text-green-600 font-medium">${listing.price}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Bedrooms</h3>
          <p>{listing.bedroomNumber}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Status</h3>
          <p
            className={listing.isAvailable ? "text-green-600" : "text-red-600"}
          >
            {listing.isAvailable ? "Available" : "Not Available"}
          </p>
        </div>
      </div>

      {listing?.isDeleted && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <span className="flex items-center gap-2 text-red-600 font-medium">
            <Ban className="w-4 h-4" />
            This listing has been marked for deletion
          </span>
        </div>
      )}
    </div>
  );

  const renderEditContent = (listing: TListing & TMongoose) => (
    <div className="space-y-4 max-h-[90vh] overflow-y-auto">
      <ListingForm listing={listing} edit={true} />

      {listing?.isDeleted && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <span className="flex items-center gap-2 text-red-600 font-medium">
            <Ban className="w-4 h-4" />
            This listing has been marked for deletion
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <TableComponent
        cellProperties={cellProperties}
        data={listings}
        heads={heads}
        meta={meta}
        caption="Listing Management"
        onDelete={handleDelete}
        onView={handleView}
        onStatusChange={handleStatus}
        onEdit={handleEdit}
      />

      <DialogComponent
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
        data={selectedUser}
        title={modalMode === "edit" ? "Edit Listing" : "Listing Details"}
        renderViewContent={renderViewContent}
        renderEditContent={renderEditContent}
      />
    </div>
  );
};

export default ListingManagement;
