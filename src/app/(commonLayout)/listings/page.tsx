import AllListing from "@/components/modules/listing/AllListing";
import Container from "@/components/shared/Container";
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

  return (
    <Container className="">
      <AllListing query={enhancedSearchParams} />
    </Container>
  );
};

export default AllListingsPage;
