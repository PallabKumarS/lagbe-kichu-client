import CreateListing from "@/components/modules/listing/CreateListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard || Create Listing",
  description:
    "Create Listing with appropriate information and images for the property",
};

const CreateListingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return <CreateListing query={query} />;
};

export default CreateListingPage;
