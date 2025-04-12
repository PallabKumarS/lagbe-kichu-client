import OrderManagement from "@/components/modules/management/OrderManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Requests",
  description: "This is Requests Page of the dashboard used by landlord only",
};

const RequestPage = async ({
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

export default RequestPage;
