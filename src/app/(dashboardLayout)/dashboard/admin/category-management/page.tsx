import CategoryManagement from "@/components/modules/management/CategoryManagement";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Category Management",
  description:
    "This is Category Management Page of the dashboard used by admin only",
};

const ListingManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return (
    <Container>
      <CategoryManagement query={query} />
    </Container>
  );
};

export default ListingManagementPage;
