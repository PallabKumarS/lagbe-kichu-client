import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitialState {
  user: {
    role: "admin" | "buyer" | "seller";
    subRole?: "manager" | "accountant" | "inventory_staff";
    phone?: string;
    address?: string;
    passwordChangedAt?: Date;
    isDeleted: boolean;
    isActive: boolean;
    profileImage?: string;
    name: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    userId: string;
    email: string;
  } | null;
}

const initialState: IInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const userSelector = (state: RootState) => {
  return state.auth.user;
};

export const { login, logout } = authSlice.actions;
export default authSlice;
