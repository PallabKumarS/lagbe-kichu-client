import { TListing } from "./listing";
import { TUser } from "./user";

export type TOrder = {
  buyerId: TUser;
  listingId: TListing[];
  orderId: string;
  price: number;
  paymentType: "payment" | "cash";
  status:
    | "pending"
    | "processing"
    | "out for delivery"
    | "completed"
    | "cancelled";
  message?: string;
  sellerPhoneNumber?: string;
  transaction?: TTransaction;
};

export interface IOrder {
  buyerId: string;
  listingId: string[];
  orderId: string;
  price: number;
  paymentType: "payment" | "cash";
  status?:
    | "pending"
    | "processing"
    | "out for delivery"
    | "completed"
    | "cancelled";
  message?: string;
  sellerPhoneNumber?: string;
  transaction?: TTransaction;
}

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
