"use client";

import { useAppSelector } from "@/redux/hook";
import { cartSelector } from "@/redux/features/cartSlice";
import CartCard from "./CartCard";
import { userSelector } from "@/redux/features/authSlice";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/shared/CheckoutModal";
import { useState } from "react";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = useAppSelector(cartSelector);
  const user = useAppSelector(userSelector);

  // Calculate total price
  const total = cartItems.reduce((acc, item) => {
    const discountedPrice =
      item.price - (item.price * (item.discount || 0)) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className="space-y-6">
      {cartItems.length === 0 ? (
        <p className="text-center text-lg font-semibold text-muted-foreground">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4">
            {cartItems.map((item) => (
              <CartCard key={item.listingId} item={item} />
            ))}
          </div>

          {/* Total Price and Checkout Button */}
          <div className="flex justify-between items-center border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold">Total:</h2>
            <span className="text-xl font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>

          {user?.role === "buyer" ? (
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="mt-4"
              >
                Proceed to Checkout
              </Button>
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-muted-foreground">
              Please login as a buyer to checkout.
            </p>
          )}

          <CheckoutModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            price={Number(total.toFixed(2))}
          />
        </>
      )}
    </div>
  );
};

export default CartPage;
