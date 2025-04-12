import ListingManagement from "@/components/modules/management/ListingManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Listing Management",
  description:
    "This is Listing Management Page of the dashboard used by admin only",
};

const ListingManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return (
    <div>
      <ListingManagement query={query} />
    </div>
  );
};

export default ListingManagementPage;
