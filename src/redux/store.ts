/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import authSlice from "./features/authSlice";
import baseApi from "./api/baseApi";

const persistOptions = {
  key: "auth",
  storage,
};

const persistedAuth = persistReducer(persistOptions, authSlice.reducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuth,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddlewares: any) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
