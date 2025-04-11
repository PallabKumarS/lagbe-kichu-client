"use client";

import { TListing, TMongoose, TRequest } from "@/types";
import { motion } from "framer-motion";
import ImageSlider from "@/components/shared/ImageSlider";
import { Badge } from "@/components/ui/badge";
import { Bed, MapPin, Check, Calendar, ReceiptTextIcon } from "lucide-react";
import { formatDistance } from "date-fns";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import { Modal } from "@/components/shared/Modal";
import RequestForm from "@/components/forms/RequestForm";
import { useEffect, useState } from "react";
import { getPersonalRequests } from "@/services/RequestService";

interface ListingDetailsProps {
  listing: TListing & TMongoose;
}

const ListingDetails = ({ listing }: ListingDetailsProps) => {
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const user = useAppSelector(userSelector);

  useEffect(() => {
    const getRequests = async () => {
      const requests = await getPersonalRequests();

      const filteredRequests = requests?.data?.filter(
        (request: TRequest) =>
          request?.listingId.listingId === listing.listingId
      );

      const isMatched = filteredRequests?.some(
        (request: TRequest) => request?.buyerId.userId === user?.userId
      );

      setIsMatched(isMatched);
    };

    getRequests();
  }, [listing?.listingId, user?.userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 mb-20"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{listing.title}</h1>
          <Badge
            className={listing.isAvailable ? "bg-green-500" : "bg-red-500"}
          >
            {listing.isAvailable ? "Available" : "Rented"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <p>{listing.title}</p>
        </div>
      </div>

      {/* Image Slider */}
      <div className="overflow-hidden rounded-xl">
        <ImageSlider images={listing.images} variant="detail" />
      </div>

      {/* Details Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Property Details</h2>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                <span>{listing.bedroomNumber} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>
                  Status: {listing.isAvailable ? "Available" : "Rented"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-primary">
              ${listing.price.toLocaleString()}/month
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Listed on:
                {formatDistance(new Date(listing.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>

          {listing.features && (
            <div className="space-y-2 mb-10">
              <h3 className="text-xl font-semibold">Additional Features</h3>
              <p className="text-muted-foreground">{listing.features}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Request Button Section */}
      <div className="mt-6 text-center mx-auto">
        {user?.role === "tenant" ? (
          <>
            {listing.isAvailable ? (
              isMatched ? (
                <div className="rounded-xl border bg-muted p-4 mx-auto text-center">
                  <p className="text-lg font-medium text-muted-foreground text-center">
                    You have already requested to rent this property.
                  </p>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Modal
                    trigger={
                      <p className="w-full py-3 px-4 text-center bg-primary text-white hover:bg-primary/90 rounded-md cursor-pointer transition-colors font-medium flex items-center justify-center gap-2">
                        <ReceiptTextIcon className="h-5 w-5" />
                        Request to Rent
                      </p>
                    }
                    content={<RequestForm user={user} listing={listing} />}
                    title="Request to Rent"
                  />
                </motion.div>
              )
            ) : (
              <div className="rounded-xl border bg-muted p-4 mx-auto text-center">
                <p className="text-lg font-medium text-muted-foreground text-center">
                  This property is currently rented. Check back later or explore
                  other available properties.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border bg-muted p-4 mx-auto text-center">
            <p className="text-lg font-medium text-muted-foreground text-center">
              Only tenants can request to rent properties. Please log in as a
              tenant to make a request.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ListingDetails;
