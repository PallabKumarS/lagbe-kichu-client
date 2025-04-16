"use client";

import { motion } from "framer-motion";
import ImageSlider from "@/components/shared/ImageSlider";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, ClipboardList, Youtube } from "lucide-react";
import { formatDistance } from "date-fns";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  cartSelector,
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cartSlice";
import { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { useGetSingleListingQuery } from "@/redux/api/listingApi";
import Link from "next/link";
import LoadingData from "@/components/shared/LoadingData";
import Container from "@/components/shared/Container";
import BackButton from "@/components/shared/BackButton";
import Reviews from "../management/Reviews";
import { extractYouTubeId } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ListingDetailsProps {
  listingId: string;
}

const ListingDetails = ({ listingId }: ListingDetailsProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartSelector);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const { data: listing, isFetching } = useGetSingleListingQuery(listingId, {
    skip: !listingId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (listing?.data?.discountEndDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const end = new Date(listing.data.discountEndDate!).getTime();
        const diff = Math.max(end - now, 0);
        setTimeLeft(diff);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [listing?.data?.discountEndDate]);

  if (isFetching) {
    return <LoadingData />;
  }

  const isItemInCart = cartItems.some(
    (item) => item.listingId === listing?.data?.listingId
  );

  const cartItem = cartItems.find(
    (item) => item.listingId === listing?.data?.listingId
  );

  const handleAddToCart = () => {
    const newItem = {
      ...listing?.data,
      quantity: 1,
    };
    dispatch(addToCart(newItem));
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      dispatch(
        updateQuantity({ listingId: cartItem.listingId, type: "increment" })
      );
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem) {
      dispatch(
        updateQuantity({ listingId: cartItem.listingId, type: "decrement" })
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItem) {
      dispatch(removeFromCart(cartItem.listingId));
    }
  };

  return (
    <Container>
      {listing?.data ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 mb-20"
        >
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">
                {listing?.data?.title}
              </h1>
              <Badge
                className={
                  listing?.data?.isAvailable ? "bg-green-500" : "bg-red-500"
                }
              >
                {listing?.data?.isAvailable ? "Available" : "Rented"}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <ClipboardList className="h-4 w-4" />
              <p>{listing?.data?.title}</p>
            </div>

            <BackButton />
          </div>

          {/* image and video link tabs  */}
          <Tabs defaultValue="images" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 h-10">
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-accent data-[state=active]:text-secondary data-[state=active]:dark:bg-accent data-[state=active]:dark:text-secondary"
              >
                Images
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-accent data-[state=active]:text-secondary data-[state=active]:dark:bg-accent data-[state=active]:dark:text-secondary"
              >
                Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images">
              <Card className="bg-background border-muted mt-10">
                <CardHeader>
                  <CardTitle>Image Gallery</CardTitle>
                  <CardDescription>
                    Swipe to view product photos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-xl">
                    <ImageSlider
                      images={listing?.data?.images}
                      variant="detail"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video">
              <Card className="bg-background border-muted mt-10">
                <CardHeader>
                  <CardTitle>Product Video</CardTitle>
                  <CardDescription>Watch the product in action</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 relative overflow-hidden rounded-t-lg">
                    <Youtube className="text-red-600" />
                    <h3 className="text-lg font-semibold text-foreground">
                      Watch on YouTube
                    </h3>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md h-[60vh]">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(
                        listing?.data?.videoLink
                      )}`}
                      title="Product Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Image Slider */}
          {/* <div className="overflow-hidden rounded-xl max-w-4xl mx-auto">
            <ImageSlider images={listing?.data?.images} variant="detail" />
          </div> */}

          {/* Video Section - Responsive YouTube Embed */}
          {/* <div className="max-w-4xl mx-auto my-8">
            <div className="flex items-center gap-2 mb-4">
              <Youtube className="text-red-600" />
              <h3 className="text-xl font-semibold">Product Video</h3>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeId(
                  listing.data.videoLink
                )}`}
                title="Product Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div> */}

          {/* Details Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Product Details</h2>
                <p className="text-muted-foreground">
                  {listing?.data?.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <BiCategoryAlt className="h-4 w-4" />
                    <span className="text-sm">
                      {listing?.data?.category.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>
                      Status:{" "}
                      {listing?.data?.isAvailable ? "Available" : "Rented"}
                    </span>
                  </div>
                </div>
              </div>

              {/* time countdown here  */}
              {listing?.data?.isDiscountActive && timeLeft > 0 && (
                <div className="mt-4 space-y-2 text-sm text-green-600 font-semibold">
                  <p>🎉 Discount: {listing?.data?.discount}% off!</p>
                  <p>
                    ⏳ Ends in: {new Date(timeLeft).toISOString().slice(11, 19)}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-primary">
                  ${listing?.data?.price.toLocaleString()}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Listed on:
                    {formatDistance(
                      new Date(listing?.data?.createdAt),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="rounded-xl border bg-card p-6 shadow-sm space-y-2">
                <h3 className="text-lg font-semibold">Seller Info</h3>
                <div className="text-sm text-muted-foreground">
                  <p>Name: {listing?.data?.sellerId.name}</p>
                  <p>Email: {listing?.data?.sellerId.email}</p>
                  <p>
                    Phone: {listing?.data?.sellerId?.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Add to Cart / Quantity Control */}
          <div>
            {!isItemInCart ? (
              <div className="mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark"
                >
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={handleDecreaseQuantity}
                  className="px-4 py-2 bg-gray-300 rounded-md text-sm text-muted-foreground"
                >
                  -
                </button>
                <span className="text-lg font-semibold">
                  {cartItem?.quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="px-4 py-2 bg-gray-300 rounded-md text-sm text-muted-foreground"
                >
                  +
                </button>
                <button
                  onClick={handleRemoveFromCart}
                  className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="mt-12">
            <Reviews listingId={listingId} />
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <div className="text-4xl">🥲</div>
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
      )}
    </Container>
  );
};

export default ListingDetails;
