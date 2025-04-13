import LoginPage from "@/components/modules/pages/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LagbeKichu | Login",
  description: "Login to your account or register a new account",
};

const page = () => {
  return <LoginPage />;
};

export default page;
