import Privacy from "@/components/modules/pages/Privacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LagbeKichu | Privacy Policy",
  description: "Privacy Policy for LagbeKichu Website",
};

const page = () => {
  return <Privacy />;
};

export default page;
