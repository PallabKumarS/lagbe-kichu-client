import Categories from "@/components/modules/home/Categories";
import HeroSection from "@/components/modules/home/HeroSection";
import NeswLetter from "@/components/modules/home/NeswLetter";
import NewProducts from "@/components/modules/home/NewProducts";
import OurStats from "@/components/modules/home/OurStats";
import Tips from "@/components/modules/home/Tips";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LagbeKichu | Home",
  description:
    "Welcome to LagbeKichu, your gateway to finding your dream products and services. We're here to help you discover the perfect match for your needs.",
};

const page = () => {
  return (
    <Container className="space-y-10">
      <HeroSection />
      <Tips />
      <OurStats />
      <NewProducts />
      <Categories />
      <NeswLetter />
    </Container>
  );
};

export default page;
