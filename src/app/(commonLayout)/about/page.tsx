import AboutUs from "@/components/modules/pages/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NestHunt | About Us",
  description:
    "Know about lagbe kichu and our team and the features we provide",
};

const page = () => {
  return <AboutUs />;
};

export default page;
