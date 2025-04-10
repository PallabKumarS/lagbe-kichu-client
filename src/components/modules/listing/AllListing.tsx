import Filter from "@/components/shared/Filter";
import ListingCard from "./ListingCard";
import NoData from "@/components/shared/NoData";
import { PaginationComponent } from "@/components/shared/Pagination";
import { TListing, TMeta, TMongoose } from "@/types";

interface AllListingProps {
  listings: (TListing & TMongoose)[];
  meta: TMeta;
}

const AllListing = ({ listings, meta }: AllListingProps) => {
  return (
    <div className="space-y-8">
      <div className="gap-2 items-center flex flex-col md:flex-row justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Available Properties
          </h1>
          <p className="text-muted-foreground">
            Discover your perfect home from our curated collection of properties
          </p>
        </div>

        <Filter />
      </div>

      {listings?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] lg:grid-cols-3 gap-4 mb-20">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      <PaginationComponent meta={meta} />
    </div>
  );
};

export default AllListing;
