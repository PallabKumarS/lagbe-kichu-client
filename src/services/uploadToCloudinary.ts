"use server";

export const uploadToCloudinary = async (file: File) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "unsigned_upload");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error?.message || "Upload failed");
  }

  return result.secure_url;
};
