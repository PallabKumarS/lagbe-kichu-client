import AllTrack from "@/components/modules/pages/AllTrack";
import Container from "@/components/shared/Container";
import { getPersonalRequests } from "@/services/RequestService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Track Orders",
  description: "This is Track Orders Page of the dashboard used by buyer only",
};

const TrackingPage = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests: any = await getPersonalRequests({ limit: 12 });

  return (
    <Container>
      <AllTrack requests={requests?.data} />
    </Container>
  );
};

export default TrackingPage;
