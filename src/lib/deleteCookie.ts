"use server";

import { cookies } from "next/headers";

export const deleteCookie = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
};
