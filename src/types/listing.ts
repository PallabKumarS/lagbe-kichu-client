import { TUser } from "./user";

export type TListing = {
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  sellerId: TUser;
  discount?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  isDiscountActive?: boolean;
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
  discount?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  isDiscountActive?: boolean;
  isAvailable?: boolean;
  listingId: string;
  isDeleted?: boolean;
}
