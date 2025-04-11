import HeroSection from "@/components/modules/home/HeroSection";
import Testimonials from "@/components/modules/home/Testimonials";
import Tips from "@/components/modules/home/Tips";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LagbeKichu | Home",
  description:
    "Welcome to LagbeKichu, your gateway to finding your dream home.",
};

const page = () => {
  return (
    <Container className="space-y-10">
      <HeroSection />
      <Testimonials />
      <Tips />
    </Container>
  );
};

export default page;
