import AllTrack from "@/components/modules/pages/AllTrack";
import Container from "@/components/shared/Container";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { getPersonalRequests } from "@/services/RequestService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Track Requests",
  description:
    "This is Track Requests Page of the dashboard used by tenant only",
};

const TrackingPage = async () => {
  const requests: any = await getPersonalRequests({ limit: 12 });

  // if (requests?.data?.length === 0) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return (
    <Container>
      <AllTrack requests={requests?.data} />
    </Container>
  );
};

export default TrackingPage;
