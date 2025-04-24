import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { cartSelector, clearCart, TCartItem } from "@/redux/features/cartSlice";
import { userSelector } from "@/redux/features/authSlice";
import { toast } from "sonner";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
} from "@/redux/api/orderApi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

const CheckoutModal: FC<CheckoutModalProps> = ({ isOpen, onClose, price }) => {
  const [createOrder] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();

  const cartItems = useAppSelector(cartSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [paymentType, setPaymentType] = useState<"cash" | "payment">("cash");

  const order = {
    buyerId: user?.userId,
    paymentType,
    listingId: cartItems.map((item) => item.listingId),
    price,
  };

  const handleConfirm = async () => {
    const toastId = toast.loading("Submitting order...");

    try {
      const res = await createOrder({ ...order, paymentType }).unwrap();

      if (!res.success) {
        toast.error(res?.message || "Order failed", { id: toastId });
        return;
      }

      if (paymentType === "payment") {
        const payRes = await createPayment(res?.data?.orderId).unwrap();

        if (payRes?.success) {
          toast.success(payRes.message, { id: toastId });
          setTimeout(() => {
            window.open(payRes?.data?.transaction?.paymentUrl, "_blank");
          }, 500);
        } else {
          toast.error(payRes?.message || "Payment initiation failed", {
            id: toastId,
          });
        }
      } else {
        toast.success("Order placed successfully!", { id: toastId });
      }

      dispatch(clearCart());
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Buyer ID:</strong> {order.buyerId}
          </p>
          <p>
            <strong>Items:</strong> {order.listingId.length} item(s)
          </p>
          <div>
            <strong>Item Details:</strong>
            <ul className="list-disc list-inside mt-1">
              {cartItems.map((item: TCartItem) => (
                <li key={item.listingId}>
                  {item.title} × {item.quantity} = $
                  {(
                    item.price -
                    ((item.discount || 0) / 100) * item.quantity * item.price
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Total Price:</strong> ${order.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <p className="font-medium">Choose Payment Type:</p>
          <RadioGroup
            defaultValue="cash"
            onValueChange={(val) => setPaymentType(val as "cash" | "payment")}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Cash on Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="payment" id="payment" />
              <Label htmlFor="payment">Online Payment</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            {paymentType === "payment" ? "Pay & Confirm" : "Place Order"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
