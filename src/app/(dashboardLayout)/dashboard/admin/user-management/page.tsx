import UserManagement from "@/components/modules/management/UserManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | User Management",
  description:
    "This is User Management Page of the dashboard used by admin only",
};

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return (
    <div>
      <UserManagement query={query} />
    </div>
  );
};

export default UserManagementPage;
