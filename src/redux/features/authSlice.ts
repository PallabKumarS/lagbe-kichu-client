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
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = !!state.token;
    },
  },
});

export const userSelector = (state: RootState) => {
  return state.auth.user;
};

export const tokenSelector = (state: RootState) => {
  return state.auth.token;
};

export const isAuthenticatedSelector = (state: RootState) => {
  return state.auth.isAuthenticated;
};

export const { login, logout, setUser, clearUser } = authSlice.actions;

export default authSlice;
