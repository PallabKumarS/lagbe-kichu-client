"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// Get all requests
export const getAllRequests = async (query?: Record<string, unknown>) => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests?${queryString}`,
      {
        next: {
          tags: ["requests"],
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get single request
export const getSingleRequest = async (requestId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/${requestId}`,
      {
        next: {
          tags: ["request"],
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

// Get all personal requests
export const getPersonalRequests = async (query?: Record<string, unknown>) => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/personal?${queryString}`,
      {
        next: {
          tags: ["PRequests"],
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

// Create request
export const createRequest = async (requestData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/requests`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    revalidateTag("requests");
    revalidateTag("PRequests");
    revalidateTag("request");

    return res.json();
  } catch (error: any) {
    return Error(error.message || "Something went wrong");
  }
};

// Update request status
export const updateRequestStatus = async (
  requestId: string,
  status: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/status/${requestId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    const result = await res.json();

    revalidateTag("listings");
    revalidateTag("PListings");
    revalidateTag("listing");

    return result;
  } catch (error: any) {
    return Error(error.message || "Something went wrong");
  }
};
// Update request status
export const updateRequest = async (
  requestId: string,
  payload: any
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/${requestId}`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    const result = await res.json();

    revalidateTag("listings");
    revalidateTag("PListings");
    revalidateTag("listing");
    revalidateTag("user");
    revalidateTag("users");
    revalidateTag("PUsers");

    return result;
  } catch (error: any) {
    return Error(error.message || "Something went wrong");
  }
};

// Delete request
export const deleteRequest = async (requestId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/${requestId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("requests");
    revalidateTag("PRequests");
    revalidateTag("request");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// start payment process
export const createPayment = async (requestId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/create-payment/${requestId}`,
      {
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );
    revalidateTag("requests");
    revalidateTag("PRequests");
    revalidateTag("request");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// verify payment process
export const verifyPayment = async (paymentId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/verify-payment/${paymentId}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
