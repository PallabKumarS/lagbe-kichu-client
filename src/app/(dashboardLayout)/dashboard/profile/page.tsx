import Profile from "@/components/modules/pages/Profile";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard || Profile",
  description: "Profile page for the user to check their profile information",
};

const ProfilePage = async () => {
  return (
    <Container>
      <Profile />
    </Container>
  );
};

export default ProfilePage;
