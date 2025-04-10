import Settings from "@/components/modules/pages/Settings";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard || Settings",
  description: "Settings page for the user to update their profile information",
};

const SettingsPage = () => {
  return (
    <Container>
      <Settings />
    </Container>
  );
};

export default SettingsPage;
