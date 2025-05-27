/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
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
import { useCheckCouponCodeQuery } from "@/redux/api/orderApi";
import { Check, Loader2, Tag, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

const CheckoutModal: FC<CheckoutModalProps> = ({ isOpen, onClose, price }) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState<string>("");
  const [shouldCheckCoupon, setShouldCheckCoupon] = useState<boolean>(false);

  const cartItems = useAppSelector(cartSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [paymentType, setPaymentType] = useState<"cash" | "payment">("cash");

  const [createOrder] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();
  const {
    data: couponData,
    isLoading: isCouponLoading,
    error: couponQueryError,
    refetch: refetchCoupon,
  } = useCheckCouponCodeQuery(couponCode, {
    skip: !shouldCheckCoupon || !couponCode.trim(),
  });

  const calculateFinalPrice = () => {
    let finalPrice = price;
    if (appliedCoupon) {
      if (appliedCoupon.type === "percentage") {
        finalPrice = price - (price * appliedCoupon.value) / 100;
      } else if (appliedCoupon.type === "fixed") {
        finalPrice = Math.max(0, price - appliedCoupon.value);
      }
    }
    return finalPrice;
  };

  const finalPrice = calculateFinalPrice();

  const order = {
    buyerId: user?.userId,
    paymentType,
    listingId: cartItems.map((item) => item.listingId),
    price: finalPrice,
    couponCode: appliedCoupon?.code || null,
  };

  useEffect(() => {
    if (shouldCheckCoupon && couponData) {
      if (couponData.success) {
        setAppliedCoupon(couponData.data);
        setCouponError("");
      } else {
        setAppliedCoupon(null);
        setCouponError(couponData.message || "Invalid coupon code");
      }
      setShouldCheckCoupon(false);
    }
  }, [couponData, shouldCheckCoupon]);

  useEffect(() => {
    if (shouldCheckCoupon && couponQueryError) {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
      setShouldCheckCoupon(false);
    }
  }, [couponQueryError, shouldCheckCoupon]);

  const handleConfirm = async () => {
    // Check if coupon is invalid and disable checkout
    if (couponCode.trim() && !appliedCoupon) {
      toast.error("Please apply a valid coupon or remove the coupon code");
      return;
    }

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

  const handleCouponCheck = () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setShouldCheckCoupon(true);
    setCouponError("");
  };

  const handleCouponClear = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
    setShouldCheckCoupon(false);
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

          {/* Coupon Section */}
          <div className="mt-4 space-y-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <p className="font-medium">
                Coupon Code{" "}
                <span className="text-sm text-muted-foreground">
                  (Optional)
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1"
                disabled={isCouponLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCouponCheck}
                disabled={!couponCode.trim() || isCouponLoading}
                className="px-4"
              >
                {isCouponLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
              {(appliedCoupon || couponCode) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCouponClear}
                  className="px-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Coupon Status */}
            {couponError && (
              <div className="flex items-center gap-2 text-destructive">
                <X className="w-4 h-4" />
                <span className="text-sm">{couponError}</span>
              </div>
            )}

            {appliedCoupon && (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {appliedCoupon.code} -{" "}
                  {appliedCoupon.type === "percentage"
                    ? `${appliedCoupon.value}% OFF`
                    : `$${appliedCoupon.value} OFF`}
                </Badge>
              </div>
            )}
          </div>

          {/* price display */}
          <div className="space-y-2">
            <p>
              <strong>Original Price:</strong> ${price.toFixed(2)}
            </p>

            {appliedCoupon && (
              <>
                <p className="text-green-600">
                  <strong>Discount:</strong> -${(price - finalPrice).toFixed(2)}
                </p>
                <div className="border-t pt-2">
                  <p className="text-lg font-semibold">
                    <strong>Final Price:</strong> ${finalPrice.toFixed(2)}
                  </p>
                </div>
              </>
            )}

            {!appliedCoupon && (
              <p>
                <strong>Total Price:</strong> ${price.toFixed(2)}
              </p>
            )}
          </div>
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
          <Button
            onClick={handleConfirm}
            disabled={couponCode.trim() !== "" && !appliedCoupon}
            className={couponCode.trim() && !appliedCoupon ? "opacity-50" : ""}
          >
            {paymentType === "payment" ? "Pay & Confirm" : "Place Order"}
            {finalPrice !== price && ` ($${finalPrice.toFixed(2)})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
