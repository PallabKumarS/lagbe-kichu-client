"use server";

import { cookies } from "next/headers";

export const setCookies = async (accessToken: string, refreshToken: string) => {
  console.log(accessToken, refreshToken);

  (await cookies()).set("access_token", accessToken);
  (await cookies()).set("refresh_token", refreshToken);
};
