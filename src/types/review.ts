import { TListing } from "./listing";
import { TUser } from "./user";

export type TReview = {
  userId: TUser;
  listingId: TListing;
  rating: number;
  isReviewed: boolean;
  comment?: string;
};

export interface IReview {
  userId: string;
  listingId: string;
  rating: number;
  comment?: string;
}
