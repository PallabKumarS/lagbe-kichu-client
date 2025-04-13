"use server";

import { cookies } from "next/headers";

export const deleteCookie = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};
