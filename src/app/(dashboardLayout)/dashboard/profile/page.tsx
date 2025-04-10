import Profile from "@/components/modules/pages/Profile";
import Container from "@/components/shared/Container";
import DelayedNoData from "@/components/shared/DelayedNoData";
import LoadingData from "@/components/shared/Loading";
import { getMe } from "@/services/UserService";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard || Profile",
  description: "Profile page for the user to check their profile information",
};

const ProfilePage = async () => {
  const user = await getMe();

  // if (!user?.data) {
  //   return (
  //     <Suspense fallback={<LoadingData />}>
  //       <DelayedNoData />
  //     </Suspense>
  //   );
  // }

  return (
    <Container>
      <Profile user={user?.data} />
    </Container>
  );
};

export default ProfilePage;
