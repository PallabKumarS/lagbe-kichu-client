import AllListing from "@/components/modules/listing/AllListing";
import Container from "@/components/shared/Container";
import { getAllListings } from "@/services/ListingService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LK || All Listings",
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


  return (
    <Container className="">
      <AllListing listings={listings?.data} meta={listings?.meta} />
    </Container>
  );
};

export default AllListingsPage;
