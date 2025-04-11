import { TListing } from "./listing";
import { TOrder } from "./order";
import { TUser } from "./user";

export type TReview = {
  userId: TUser;
  listingId: TListing;
  orderId: TOrder;
  rating: number;
  comment?: string;
};
