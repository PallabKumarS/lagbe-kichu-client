import ListingDetails from "@/components/modules/listing/ListingDetails";
import Container from "@/components/shared/Container";
import { getSingleListing } from "@/services/ListingService";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ listingId: string }>;
}): Promise<Metadata> {
  const listing = await getSingleListing((await params).listingId);

  return {
    title: `NH || ${listing?.data?.houseLocation}`,
    description: listing?.data?.description,
  };
}

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const listingId = (await params).listingId;
  const listing = await getSingleListing(listingId);

  console.log(listing)

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-4xl">🏠</div>
        <h2 className="text-2xl font-semibold text-gray-800">
          No Listing Found
        </h2>
        <p className="text-gray-600">
          This listing may have been removed or is no longer available.
        </p>
        <Link href="/listings" className="text-primary hover:underline">
          Browse other listings
        </Link>
      </div>
    );
  }

  return (
    <Container>
      <ListingDetails listing={listing?.data} />
    </Container>
  );
};

export default ListingDetailsPage;
