"use client";

import { useGetAllListingsQuery } from "@/redux/api/listingApi";
import ListingCard from "../listing/ListingCard";
import LoadingData from "@/components/shared/LoadingData";
import NoData from "@/components/shared/NoData";
import { TListing, TMongoose } from "@/types";
import { useRouter } from "next/navigation";

const NewProducts = () => {
  const { data: listings, isFetching } = useGetAllListingsQuery({
    limit: 4,
    sort: "-createdAt", // Sort by newest first
  });

  const router = useRouter();

  if (isFetching) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              New Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest additions to our marketplace
            </p>
          </div>
          <LoadingData />
        </div>
      </section>
    );
  }

  if (!listings?.success || !listings?.data?.length) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              New Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the latest additions to our marketplace
            </p>
          </div>
          <NoData />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Fresh Arrivals
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            New{" "}
            <span className="text-primary relative">
              Products
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest additions to our marketplace - fresh listings
            just for you
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] gap-6 mb-12">
          {listings.data.map((listing: TListing & TMongoose, index: number) => (
            <div
              key={listing._id}
              className="group relative opacity-0 animate-fade-in"
              style={{
                animationDelay: `${Math.min(index * 100, 800)}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* New Badge - Fixed positioning */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  NEW
                </div>
              </div>

              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/listings")}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            <span>View All Products</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Optimized CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default NewProducts;
