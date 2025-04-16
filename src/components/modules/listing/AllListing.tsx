"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
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

const AllListing = ({ query: initialQuery }: AllListingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState(initialQuery);

  const { data: listings, isFetching } = useGetAllListingsQuery(
    { ...query,...initialQuery},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const handleSearch = () => {
    const newQuery = {
      ...initialQuery,
      searchTerm,
    };
    setQuery(newQuery);
  };

  const handleClear = () => {
    setSearchTerm("");
    setQuery(initialQuery);
  };

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

        {/* Search bar */}
        <div className="w-full max-w-md">
          <div className="relative flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors flex items-center justify-center"
            >
              <Search className="w-6 h-7" />
            </button>
          </div>
        </div>

        <Filter />
      </div>

      {listings?.data?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] gap-4 mb-20">
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
