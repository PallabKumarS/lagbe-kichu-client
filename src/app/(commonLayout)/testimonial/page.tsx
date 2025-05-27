import Testimonials from "@/components/modules/pages/Testimonials";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "Testimonial | Lagbe Kichu",
  description: "This is Testimonial page",
};

const page = () => {
  return (
    <Container>
      <Testimonials />
    </Container>
  );
};

export default page;
