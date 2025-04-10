import { TListing } from "./listing";
import { TUser } from "./user";

export type TRequest = {
  tenantId: TUser;
  listingId: TListing;
  landlordId: TUser;
  requestId: string;
  status: "pending" | "approved" | "rejected" | "paid" | "cancelled";
  message?: string;
  moveInDate: Date;
  rentDuration: string;
  landlordPhoneNumber?: string;
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
