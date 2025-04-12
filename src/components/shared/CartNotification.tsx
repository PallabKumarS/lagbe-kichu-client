"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hook";
import { cartSelector } from "@/redux/features/cartSlice";

const CartNotifyIcon = () => {
  const items = useAppSelector(cartSelector);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative w-fit">
      <ShoppingCart className="h-6 w-6 text-muted-foreground" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1.5 py-0 text-[10px] font-semibold flex items-center justify-center rounded-full shadow"
        >
          {itemCount}
        </Badge>
      )}
    </div>
  );
};

export default CartNotifyIcon;
