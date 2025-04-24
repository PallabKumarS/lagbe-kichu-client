/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderTracking from "@/components/modules/pages/OrderTracking";
import Container from "@/components/shared/Container";
import { getValidToken } from "@/lib/verifyToken";
import { Metadata } from "next";

const getSingleRequest = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`,
      {
        next: {
          tags: ["request"],
        },
        headers: {
          Authorization: await getValidToken(),
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    console.log(error);
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> {
  const request = await getSingleRequest((await params).orderId);

  return {
    title: `Track || ${request?.data?.orderId}`,
    description:
      "This is Track Details Page of the dashboard used by buyer only",
  };
}

const TrackDetailsPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const orderId = (await params).orderId;

  return (
    <Container>
      <OrderTracking orderId={orderId} />
    </Container>
  );
};

export default TrackDetailsPage;
