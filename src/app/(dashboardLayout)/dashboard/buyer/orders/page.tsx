import OrderManagement from "@/components/modules/management/OrderManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Orders",
  description: "This is Orders Page of the dashboard used by buyer only",
};

const OrderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return (
    <div>
      <OrderManagement query={query} />
    </div>
  );
};

export default OrderPage;
