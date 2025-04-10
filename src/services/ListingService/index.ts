/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// Get all listings
export const getAllListings = async (query: Record<string, unknown>) => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings?${queryString}`,
      {
        next: {
          tags: ["listing"],
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get single listing
export const getSingleListing = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        next: {
          tags: ["listing"],
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get all personal listings
export const getPersonalListings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/personal`,
      {
        next: {
          tags: ["PListings"],
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

// Create listing
export const createListing = async (listingData: any): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      body: JSON.stringify(listingData),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    revalidateTag("listings");
    revalidateTag("PListings");
    revalidateTag("locations");
    revalidateTag("listing");

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// update listing
export const updateListing = async (
  listingId: string,
  listingData: any
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        method: "PATCH",
        body: JSON.stringify(listingData),
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    revalidateTag("listings");
    revalidateTag("PListings");
    revalidateTag("listing");

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Update listing status
export const updateListingStatus = async (listingId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/status/${listingId}`,
      {
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json",
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("listings");
    revalidateTag("PListings");
    revalidateTag("listing");

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Delete listing
export const deleteListing = async (listingId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: await getValidToken(),
        },
      }
    );

    revalidateTag("listings");
    revalidateTag("PListings");
    revalidateTag("locations");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get listing locations
export const getListingLocations = async (): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/locations`,
      {
        next: {
          tags: ["locations"],
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
