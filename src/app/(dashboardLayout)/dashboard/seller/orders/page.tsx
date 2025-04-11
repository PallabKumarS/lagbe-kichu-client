import RequestManagement from "@/components/modules/management/RequestManagement";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/LoadingData";
import NoData from "@/components/shared/NoData";
import { getPersonalRequests } from "@/services/RequestService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Requests",
  description: "This is Requests Page of the dashboard used by landlord only",
};

const RequestPage = async () => {
  const requests = await getPersonalRequests({ limit: 12 });

  // if (requests?.data?.length === 0) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return (
    <div>
      <RequestManagement requests={requests?.data} meta={requests?.meta} />
    </div>
  );
};

export default RequestPage;
