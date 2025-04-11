import CreateListing from "@/components/modules/listing/CreateListing";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { getPersonalListings } from "@/services/ListingService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard || Create Listing",
  description:
    "Create Listing with appropriate information and images for the property",
};

const CreateListingPage = async () => {
  const listings = await getPersonalListings();

  // if (listings?.data?.length === 0) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return <CreateListing listings={listings?.data} />;
};

export default CreateListingPage;
