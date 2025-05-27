import FAQ from "@/components/modules/pages/FAQ";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Lagbe Kichu",
  description:
    "Frequently asked questions about Lagbe Kichu marketplace - find answers to common questions about buying, selling, payments, shipping, and account management.",
  keywords:
    "FAQ, help, support, questions, Lagbe Kichu, marketplace, buying, selling",
};

const page = () => {
  return (
    <Container>
      <FAQ />
    </Container>
  );
};

export default page;
