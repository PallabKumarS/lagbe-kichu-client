import UserManagement from "@/components/modules/management/UserManagement";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { getAllUsers } from "@/services/UserService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | User Management",
  description:
    "This is User Management Page of the dashboard used by admin only",
};

const UserManagementPage = async () => {
  const users = await getAllUsers({ limit: 12 });

  // if (users?.data?.length === 0) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return (
    <div>
      <UserManagement users={users?.data} meta={users?.meta} />
    </div>
  );
};

export default UserManagementPage;
