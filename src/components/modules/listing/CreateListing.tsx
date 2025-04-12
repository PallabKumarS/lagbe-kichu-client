"use client";

import ListingForm from "@/components/forms/ListingForm";
import Container from "@/components/shared/Container";
import { Modal } from "@/components/shared/Modal";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListingCard from "./ListingCard";
import { useGetPersonalListingsQuery } from "@/redux/api/listingApi";
import { TListing, TMongoose } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";
import LoadingData from "@/components/shared/LoadingData";
import { useState } from "react";

const CreateListing = ({ query }: { query: Record<string, string> }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: listings, isFetching } = useGetPersonalListingsQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) return <LoadingData />;

  console.log(listings)

  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-between gap-y-5 gap-x-2 mb-20">
        <div>
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight",
              "bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
            )}
          >
            Create Your Listing
          </h1>
          <p className="mt-2 text-muted-foreground">
            Share your property with potential tenants
          </p>
        </div>

        <Modal
          title="Create Listing"
          trigger={
            <Button
              variant="secondary"
              className={cn(
                "px-6 py-2 text-lg",
                "bg-gradient-to-r from-green-500 to-emerald-500",
                "text-white hover:opacity-90 transition-opacity",
                "shadow-md hover:shadow-lg cursor-pointer"
              )}
            >
              Create Listing
            </Button>
          }
          open={modalOpen}
          onOpenChange={setModalOpen}
          content={<ListingForm />}
        />
      </div>

      {listings?.data?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] lg:grid-cols-2 2xl:grid-cols-3 gap-4 mb-10">
          {listings?.data?.map((listing: TListing & TMongoose) => (
            <ListingCard
              edit={true}
              key={listing.listingId}
              listing={listing}
            />
          ))}
        </div>
      ) : (
        <NoData />
      )}
      <div className="mt-6 flex justify-center">
        <PaginationComponent meta={listings?.data?.meta} />
      </div>
    </Container>
  );
};

export default CreateListing;
