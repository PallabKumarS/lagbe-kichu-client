export type TUser = {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "tenant" | "landlord";
  phone?: string;
  address?: string;
  passwordChangedAt?: Date;
  isDeleted: boolean;
  isActive: boolean;
  profileImage?: string;
};
