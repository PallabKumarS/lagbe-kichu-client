"use client";

import { FC } from "react";
import { useAppDispatch } from "@/redux/hook";
import { updateQuantity, removeFromCart } from "@/redux/features/cartSlice";
import Image from "next/image";
import { TCartItem } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";

interface CartCardProps {
  item: TCartItem;
}

const CartCard: FC<CartCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const discountedPrice =
    item.price - (item.price * (item.discount || 0)) / 100;

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-card h-96">
      <div className="relative h-48 w-full cursor-pointer">
        <Image
          src={
            isValidImageUrl(item.images[0])
              ? item.images[0]
              : "https://res.cloudinary.com/dchqfpvjb/image/upload/v1744367811/CJrg-LWjjfsCEAE_rlwotv.png"
          }
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2 mt-auto">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          Quantity: {item.quantity}
        </p>
        <p className="text-sm text-muted-foreground">
          Price:{" "}
          <span className="font-medium text-foreground">
            ${discountedPrice.toFixed(2)}
          </span>{" "}
          x {item.quantity}
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() =>
              dispatch(
                updateQuantity({ listingId: item.listingId, type: "decrement" })
              )
            }
            className="px-4 py-2 bg-gray-300 rounded-md text-sm text-muted-foreground"
          >
            -
          </button>
          <span className="text-lg font-semibold">{item.quantity}</span>
          <button
            onClick={() =>
              dispatch(
                updateQuantity({ listingId: item.listingId, type: "increment" })
              )
            }
            className="px-4 py-2 bg-gray-300 rounded-md text-sm text-muted-foreground"
          >
            +
          </button>
          <button
            onClick={() => dispatch(removeFromCart(item.listingId))}
            className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
          >
            Remove
          </button>
          <button
            onClick={() => {
              router.push(`listings/${item.listingId}`);
            }}
            className="ml-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

const isValidImageUrl = (url: string) => {
  const pattern = new RegExp(
    "^https?:\\/\\/.+\\.(jpg|jpeg|png|webp|gif|bmp)$",
    "i"
  );
  return pattern.test(url);
};
