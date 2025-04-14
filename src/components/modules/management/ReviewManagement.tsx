"use client";

import Container from "@/components/shared/Container";
import NoData from "@/components/shared/NoData";
import { cn } from "@/lib/utils";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { TReview, TMongoose } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";
import LoadingData from "@/components/shared/LoadingData";
import ReviewCard from "./ReviewCard";

const ReviewManagement = ({ query }: { query: Record<string, string> }) => {
  const { data: reviews, isFetching } = useGetAllReviewsQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) return <LoadingData />;

  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-between gap-y-5 gap-x-2 mb-20">
        <div>
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight",
              "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"
            )}
          >
            Manage Reviews
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and moderate user reviews
          </p>
        </div>
      </div>

      {reviews?.data?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] lg:grid-cols-2 2xl:grid-cols-3 gap-4 mb-10">
          {reviews?.data?.map((review: TReview & TMongoose) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      <div className="mt-6 flex justify-center">
        <PaginationComponent meta={reviews?.meta} />
      </div>
    </Container>
  );
};

export default ReviewManagement;
