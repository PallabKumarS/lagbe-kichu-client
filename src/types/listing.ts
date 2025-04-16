import { TMongoose } from ".";
import { TCategory } from "./category";
import { TUser } from "./user";

export type TListing = {
  title: string;
  category: TCategory & TMongoose;
  description: string;
  price: number;
  images: string[];
  sellerId: TUser & TMongoose;
  reviewRating: {
    rating: number;
    totalCount: number;
  };
  discount: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  isDiscountActive: boolean;
  videoLink: string;
  isAvailable?: boolean;
  listingId: string;
  isDeleted?: boolean;
};

export interface IListing {
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  sellerId: string;
  videoLink: string;
  discount?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  isDiscountActive?: boolean;
  isAvailable?: boolean;
  listingId?: string;
  isDeleted?: boolean;
}
