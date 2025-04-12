import ListingDetails from "@/components/modules/listing/ListingDetails";
import Container from "@/components/shared/Container";
import { Metadata } from "next";

const getSingleListing = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        next: {
          tags: ["listing"],
        },
      }
    );
    return await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message);
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ listingId: string }>;
}): Promise<Metadata> {
  const listing = await getSingleListing((await params).listingId);

  return {
    title: `LK || ${listing?.data?.title}`,
    description: listing?.data?.description,
  };
}

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const listingId = (await params).listingId;

  return (
    <Container>
      <ListingDetails listingId={listingId} />
    </Container>
  );
};

export default ListingDetailsPage;
