export type TUser = {
  userId?: string;
  name: string;
  email: string;
  role: "admin" | "buyer" | "seller";
  subRole?: "manager" | "accountant" | "inventory_staff";
  phone?: string;
  address?: string;
  passwordChangedAt?: Date;
  isDeleted?: boolean;
  isActive?: boolean;
  profileImage?: string;
};
