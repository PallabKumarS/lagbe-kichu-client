"use client";

import { TReview, TMongoose, TUser, TListing, TOrder } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star } from "lucide-react";
import { Modal } from "@/components/shared/Modal";
import { useState } from "react";
import ConfirmationBox from "@/components/shared/ConfirmationBox";
import { toast } from "sonner";
import { useDeleteReviewMutation } from "@/redux/api/reviewApi";
import ReviewForm from "@/components/forms/ReviewForm";

type Props = {
  review: TReview & TMongoose;
};

const ReviewCard = ({ review }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex justify-center items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
        <span className="ml-2 text-sm">({rating}/5)</span>
      </div>
    );
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting review...");
    try {
      const res = await deleteReview(review._id).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  const user = review.userId as TUser;
  const listing = review.listingId as TListing;

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <span className="text-xs text-gray-500">({user.email})</span>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="font-medium text-lg">{listing.title}</h3>
          </div>

          <div className="flex justify-between items-center">
            {renderRatingStars(review.rating)}
            <span className="text-sm text-gray-600">
              ${listing.price.toFixed(2)}
            </span>
          </div>

          {review.comment && (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg">
              <p className="text-sm italic text-gray-700">{review.comment}</p>
            </div>
          )}
        </div>

        {/* button actions  */}
        <div className="flex justify-end gap-2">
          <div>
            <Modal
              title="Edit Review"
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
              trigger={
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
              }
              content={<ReviewForm edit={true} review={review} />}
            />
          </div>

          <div>
            <ConfirmationBox
              title="Delete Review"
              description="Are you sure you want to delete this review? This action cannot be undone."
              onConfirm={handleDelete}
              trigger={
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={isLoading}
                  className="hover:bg-red-300 transition-colors duration-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
