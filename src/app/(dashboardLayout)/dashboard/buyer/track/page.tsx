import AllTrack from "@/components/modules/pages/AllTrack";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Track Orders",
  description: "This is Track Orders Page of the dashboard used by buyer only",
};

const TrackingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return (
    <Container>
      <AllTrack query={query} />
    </Container>
  );
};

export default TrackingPage;
