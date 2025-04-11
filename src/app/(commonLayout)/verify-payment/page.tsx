import VerifyPayment from "@/components/modules/pages/VerifyPayment";
import Container from "@/components/shared/Container";
import { verifyPayment } from "@/services/RequestService";
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
  const request = await verifyPayment((await searchParams).order_id as string);

  return (
    <Container>
      <VerifyPayment requestData={request?.data} />
    </Container>
  );
};

export default VerifyPaymentPage;
