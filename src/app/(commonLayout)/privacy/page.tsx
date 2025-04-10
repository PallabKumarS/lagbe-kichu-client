import Privacy from "@/components/modules/pages/Privacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NestHunt | Privacy Policy",
  description: "Privacy Policy for NestHunt Website",
};

const page = () => {
  return <Privacy />;
};

export default page;
