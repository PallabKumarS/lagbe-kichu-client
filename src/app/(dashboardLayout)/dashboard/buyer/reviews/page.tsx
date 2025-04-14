import ReviewManagement from "@/components/modules/management/ReviewManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Reviews",
  description: "This is Reviews Page of the dashboard used by buyer only",
};

const ReviewPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  return (
    <div>
      <ReviewManagement query={query} />
    </div>
  );
};

export default ReviewPage;
