import CartPage from "@/components/modules/pages/CartPage";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LagbeKichu | Your Cart",
  description:
    "You can manage your cart items here. You can add, remove, and update the quantity of items in your cart.",
};

const page = () => {
  return (
    <Container>
      <CartPage />
    </Container>
  );
};

export default page;
