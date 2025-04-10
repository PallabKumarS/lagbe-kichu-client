import AllListing from "@/components/modules/listing/AllListing";
import Container from "@/components/shared/Container";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { getAllListings } from "@/services/ListingService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "NH || All Listings",
  description:
    "All Listings with appropriate information and images for the property",
};

const AllListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const enhancedSearchParams = {
    ...(await searchParams),
    isDeleted: "false",
  };

  // Get all listings
  const listings = await getAllListings(enhancedSearchParams);

  // if (listings?.data?.length === 0) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return (
    <Container className="">
      <AllListing listings={listings?.data} meta={listings?.meta} />
    </Container>
  );
};

export default AllListingsPage;
