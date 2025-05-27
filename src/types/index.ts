export * from "./user";
export * from "./meta";
export * from "./listing";
export * from "./order";
export * from "./review";
export * from "./category";
export * from "./extra";

export type TMongoose = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};
