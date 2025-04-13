"use client";

import Filter from "@/components/shared/Filter";
import ListingCard from "./ListingCard";
import NoData from "@/components/shared/NoData";
import { PaginationComponent } from "@/components/shared/Pagination";
import { useGetAllListingsQuery } from "@/redux/api/listingApi";
import LoadingData from "@/components/shared/LoadingData";
import { TListing, TMongoose } from "@/types";

interface AllListingProps {
  query: Record<string, string>;
}

const AllListing = ({ query }: AllListingProps) => {
  const { data: listings, isFetching } = useGetAllListingsQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) {
    return <LoadingData />;
  }

  return (
    <div className="space-y-8">
      <div className="gap-2 items-center flex flex-col md:flex-row justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Available Properties
          </h1>
          <p className="text-muted-foreground">
            Discover your perfect product from our curated collection of
            listings
          </p>
        </div>

        <Filter />
      </div>

      {listings?.data?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] lg:grid-cols-3 gap-4 mb-20">
          {listings?.data?.map((listing: TListing & TMongoose) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      <PaginationComponent meta={listings?.meta} />
    </div>
  );
};

export default AllListing;
