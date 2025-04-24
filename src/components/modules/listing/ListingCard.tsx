"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Check,
  X,
  Eye,
  Edit,
  Trash,
  Ban,
  Star,
  StarHalf,
  StarOff,
  Percent,
} from "lucide-react";
import Link from "next/link";
import { TListing, TMongoose } from "@/types";
import ImageSlider from "@/components/shared/ImageSlider";
import { Button } from "@/components/ui/button";
import ConfirmationBox from "@/components/shared/ConfirmationBox";
import { toast } from "sonner";
import { Modal } from "@/components/shared/Modal";
import ListingForm from "@/components/forms/ListingForm";
import { BiCategoryAlt } from "react-icons/bi";
import { useDeleteListingMutation } from "@/redux/api/listingApi";
import DiscountForm from "@/components/forms/DiscountForm";

interface ListingCardProps {
  listing: TListing & TMongoose;
  edit?: boolean;
}

const ListingCard = ({ listing, edit = false }: ListingCardProps) => {
  const [deleteListing] = useDeleteListingMutation();

  const handleDelete = async (listingId: string) => {
    const toastId = toast.loading("Deleting listing...");

    try {
      const res = await deleteListing(listingId).unwrap();
      if (res.success) {
        toast.success(res?.message, { id: toastId });
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (error:any) {
       toast.error(error.data.message, { id: toastId });
      console.log(error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden  ${edit ? "h-[580px]" : "h-[550px]"}`}>
        <CardHeader className="p-0">
          <div className="relative">
            <ImageSlider images={listing.images} variant="card" />
            <Badge
              className={`absolute right-2 top-2 z-10 ${
                listing.isAvailable ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {listing.isAvailable ? "Available" : "Rented"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent
          className="px-4"
          style={{
            paddingBottom: "0",
            marginBottom: "0",
            marginTop: "0",
            paddingTop: "0",
          }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <p className="text-sm">{listing.title}</p>
          </div>

          {/* listing details here  */}
          <div className="mt-3 space-y-2">
            <h3 className="font-semibold">${listing.price.toLocaleString()}</h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {listing.description}
            </p>
          </div>

          {/* rating here  */}
          {listing.reviewRating && (
            <div className="flex items-center gap-2 my-2">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, index) => {
                  const rounded =
                    Math.floor(listing.reviewRating.rating * 2) / 2;
                  return (
                    <span key={index}>
                      {rounded >= index + 1 ? (
                        <Star className="w-4 h-4 fill-yellow-400" />
                      ) : rounded >= index + 0.5 ? (
                        <StarHalf className="w-4 h-4 fill-yellow-400" />
                      ) : (
                        <StarOff className="w-4 h-4 text-muted" />
                      )}
                    </span>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground">
                ({listing.reviewRating.totalCount} rating
                {listing.reviewRating.totalCount > 1 ? "s" : ""})
              </p>
            </div>
          )}

          {/* discount here  */}
          {listing.discount && listing.isDiscountActive ? (
            <div className="flex items-center gap-2 text-green-600">
              <Percent className="h-4 w-4" />
              <p className="text-sm">
                {listing.discount}% Discount
                {listing.discountEndDate &&
                  ` - ${new Date(
                    listing?.discountEndDate
                  ).toLocaleDateString()}`}
              </p>
            </div>
          ) : (
            <div>
              <p>No discount</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t px-4 mt-auto">
          {/* category and availability  */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <BiCategoryAlt className="h-4 w-4" />
              <span className="text-sm">{listing.category.title}</span>
            </div>
            <div className="flex items-center gap-1">
              {listing.isAvailable ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>

          <div className="w-full items-center justify-center gap-2 flex flex-wrap">
            <Link href={`/listings/${listing.listingId}`} className="flex-1">
              <Button variant="default" className="w-full hover:bg-teal-500">
                <Eye className="mr-1 h-4 w-4" />
                View Details
              </Button>
            </Link>

            {/* only for seller and admin  */}
            {edit && (
              <>
                {/* edit modal  */}
                <Modal
                  trigger={
                    <Button variant="outline" className="flex-1">
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                  }
                  content={<ListingForm listing={listing} edit={true} />}
                  title="Edit Listing"
                />
                {/* discount modal  */}
                <Modal
                  trigger={
                    <Button variant="secondary" className="flex-1">
                      <Percent className="mr-1 h-4 w-4" />
                      Discount
                    </Button>
                  }
                  content={<DiscountForm listing={listing} />}
                  title="Add Discount"
                />

                {/* delete modal  */}
                <ConfirmationBox
                  trigger={
                    <Button variant="destructive" className="flex-1 w-full">
                      <Trash className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  }
                  onConfirm={() => handleDelete(listing.listingId!)}
                />
              </>
            )}
          </div>

          {listing?.isDeleted && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <span className="flex items-center gap-2 text-red-600 font-medium">
                <Ban className="w-4 h-4" />
                This listing has been marked for deletion
              </span>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ListingCard;
