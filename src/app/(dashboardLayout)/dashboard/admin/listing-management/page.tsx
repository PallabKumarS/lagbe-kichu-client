import ListingManagement from "@/components/modules/management/ListingManagement";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { getAllListings } from "@/services/ListingService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Listing Management",
  description:
    "This is Listing Management Page of the dashboard used by admin only",
};

const ListingManagementPage = async () => {
  const listings = await getAllListings({ limit: 12 });

  // if (listings?.data?.length === 0) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return (
    <div>
      <ListingManagement listings={listings?.data} meta={listings?.meta} />
    </div>
  );
};

export default ListingManagementPage;
