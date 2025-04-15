"use client";

import { TReview, TMongoose, TOrder } from "@/types";
import { FileEditIcon, Star } from "lucide-react";
import { useGetAllReviewsByListingIdQuery } from "@/redux/api/reviewApi";
import LoadingData from "@/components/shared/LoadingData";
import { useGetPersonalOrdersQuery } from "@/redux/api/orderApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import ReviewForm from "@/components/forms/ReviewForm";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/shared/Modal";

interface ReviewsProps {
  listingId: string;
}

const Reviews = ({ listingId }: ReviewsProps) => {
  const [hasOrdered, setHasOrdered] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [review, setReview] = useState<(TReview & TMongoose) | null>(null);

  const user = useAppSelector(userSelector);

  const { data, isFetching } = useGetAllReviewsByListingIdQuery(listingId);

  const { data: orders, isFetching: isOrderFetching } =
    useGetPersonalOrdersQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
      }
    );

  useEffect(() => {
    if (!(orders?.data?.length > 0) && !(data?.data?.length > 0)) return;

    if (user?.role !== "buyer") return;

    const hasOrdered = orders?.data?.some(
      (order: TOrder) =>
        order.status === "completed" &&
        order.listingId.some((listing) => listing.listingId === listingId)
    );

    const hasReviewed = data?.data?.some(
      (review: TReview) => review.userId.userId === user?.userId
    );

    const review = data?.data?.find(
      (review: TReview) => review.userId.userId === user?.userId
    );

    if (hasOrdered) {
      setHasOrdered(true);
    }
    if (hasReviewed) {
      setHasReviewed(true);
      setReview(review);
    }
  }, [orders, listingId, data, user]);

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
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

  if (isFetching && isOrderFetching) return <LoadingData />;

  const reviews = data?.data as (TReview & TMongoose)[];

  return (
    <div>
      {reviews?.length > 0 ? (
        <div className="space-y-4">
          {hasOrdered && !hasReviewed && (
            <div className="bg-card text-yellow-800 p-4 rounded-lg mb-4 ">
              <p className="font-semibold">
                You have ordered this product. Please review it.
              </p>
              <ReviewForm
                review={review}
                edit={hasReviewed}
                listingId={listingId}
              />
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4">
            Reviews ({reviews.length})
          </h2>

          {/* all reviews here  */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {/* review card here */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium">{review.userId.name}</span>
                  {hasReviewed && (
                    <Button
                      size="sm"
                      variant="link"
                      className="border-blue-500 border hover:bg-blue-500 hover:text-white transition-colors duration-750"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <FileEditIcon size={1} />
                    </Button>
                  )}
                </div>
                {renderRatingStars(review.rating)}
                {review.comment && (
                  <p className="text-muted-foreground italic">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          {hasOrdered && !hasReviewed && (
            <div className="bg-card text-yellow-800 p-4 rounded-lg mt-4 mb-10 w-full">
              <p className="font-semibold">
                You have ordered this product. Please review it.
              </p>
              <ReviewForm
                review={review}
                edit={hasReviewed}
                listingId={listingId}
              />
            </div>
          )}
          No reviews yet
        </div>
      )}
      {isEditModalOpen && (
        <Modal
          content={
            <ReviewForm
              review={review}
              edit={hasReviewed}
              listingId={listingId}
            />
          }
          trigger={false}
          title="Edit Review"
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </div>
  );
};

export default Reviews;
