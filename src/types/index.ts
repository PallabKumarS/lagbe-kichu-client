export * from "./user";
export * from "./meta";
export * from "./listing";
export * from "./order";

export type TMongoose = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};
