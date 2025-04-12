/* eslint-disable @typescript-eslint/no-explicit-any */
import VerifyPayment from "@/components/modules/pages/VerifyPayment";
import Container from "@/components/shared/Container";
import { getValidToken } from "@/lib/verifyToken";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}): Promise<Metadata> {
  const request = await verifyPayment((await searchParams).order_id as string);

  return {
    title: `Verify Payment || ${request?.data?.name || "Payment"}`,
    description:
      "This is Verify Payment Page of the dashboard used by tenant only",
  };
}

const VerifyPaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) => {
  const order_id = (await searchParams).order_id;

  return (
    <Container>
      <VerifyPayment order_id={order_id as string} />
    </Container>
  );
};

export default VerifyPaymentPage;

const verifyPayment = async (paymentId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/verify-payment/${paymentId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
