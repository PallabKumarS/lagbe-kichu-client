import { TUser } from "./user";

export type TListing = {
  houseLocation: string;
  description: string;
  rentPrice: number;
  bedroomNumber: number;
  images: string[];
  landlordId: TUser;
  isAvailable: boolean;
  listingId: string;
  features?: string;
  isDeleted: boolean;
};
