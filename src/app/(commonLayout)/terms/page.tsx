import Terms from "@/components/modules/pages/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NestHunt | Terms of Use",
  description: "Terms of Use for NestHunt Website",
};

const page = () => {
  return <Terms />;
};

export default page;
