"use server";

import { getValidToken } from "@/lib/verifyToken";
import { TUser } from "@/types";
import { revalidateTag } from "next/cache";

// Get all users
export const getAllUsers = async (
  query: Record<string, unknown>
): Promise<any> => {
  try {
    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users?${queryString}`,
      {
        next: {
          tags: ["users"],
        },
        headers: {
          Authorization: await getValidToken(),
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get single user
export const getSingleUser = async (userId: string): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
      {
        next: {
          tags: ["user"],
        },
        headers: {
          Authorization: token,
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get myself
export const getMe = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      next: {
        tags: ["me"],
      },
      headers: {
        Authorization: await getValidToken(),
      },
    });
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Update user
export const updateUser = async (
  userId: string,
  userData: Partial<TUser>
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("users");
    revalidateTag("me");
    revalidateTag("user");

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Update user status
export const updateUserStatus = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/status/${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("users");
    revalidateTag("me");
    revalidateTag("user");

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Update user role
export const updateUserRole = async (
  userId: string,
  role: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/role/${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ role }),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("users");
    revalidateTag("me");
    revalidateTag("user");

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Delete user
export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
