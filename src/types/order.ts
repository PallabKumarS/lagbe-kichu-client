import { TListing } from "./listing";
import { TUser } from "./user";

export type TOrder = {
  buyerId: TUser;
  listingId: TListing;
  sellerId: TUser;
  orderId: string;
  status:
    | "pending"
    | "processing"
    | "out for delivery"
    | "paid"
    | "completed"
    | "cancelled";
  message?: string;
  sellerPhoneNumber?: string;
  transaction?: TTransaction;
};

export interface IOrder {
  buyerId: string;
  listingId: TListing;
  sellerId: string;
  orderId: string;
  status:
    | "pending"
    | "processing"
    | "out for delivery"
    | "paid"
    | "completed"
    | "cancelled";
  message?: string;
  sellerPhoneNumber?: string;
  transaction?: TTransaction;
};

export type TTransaction = {
  paymentId?: string;
  transactionStatus?: string;
  paymentUrl?: string;
  bankStatus?: string;
  spCode?: string;
  spMessage?: string;
  method?: string;
  dateTime?: string;
};
