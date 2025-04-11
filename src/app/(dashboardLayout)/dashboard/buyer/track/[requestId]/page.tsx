import RequestTracking from "@/components/modules/pages/OrderTracking";
import Container from "@/components/shared/Container";
import { getSingleRequest } from "@/services/RequestService";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ requestId: string }>;
}): Promise<Metadata> {
  const request = await getSingleRequest((await params).requestId);

  return {
    title: `Track || ${request?.data?.listingId.listingId}`,
    description:
      "This is Track Details Page of the dashboard used by tenant only",
  };
}

const TrackDetailsPage = async ({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) => {
  const request = await getSingleRequest((await params).requestId);

  if (!request) return <div>Request not found</div>;

  return (
    <Container>
      <RequestTracking request={request?.data} />
    </Container>
  );
};

export default TrackDetailsPage;
