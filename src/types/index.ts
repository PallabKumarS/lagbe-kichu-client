// import { BaseQueryApi } from "@reduxjs/toolkit/query";
// import { Key } from "react";

export * from "./user";
export * from "./meta";
export * from "./listing";
export * from "./order";
export * from "./review";
export * from "./category";

export type TMongoose = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

// export type TError = {
//   status: number;
//   data: {
//     success: boolean;
//     message: string;
//     errorSources: {
//       path: string;
//       message: string;
//     }[];
//     stack?: string | null;
//   };
// };

// export type TMeta = {
//   page: number;
//   limit: number;
//   totalDoc: number;
//   totalPage: number;
// };

// export type TResponse<T> = {
//   data?: T;
//   error?: TError;
//   meta?: TMeta;
//   success: boolean;
//   message: string;
// };

// export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

// export type TQueryParams = { name: string; value: boolean | Key };
