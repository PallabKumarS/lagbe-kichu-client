import { TListing, TOrder } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  order: TOrder;
};

export const ReviewModal = ({ isOpen, onOpenChange, order }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Review the Product(s)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {order?.listingId?.map((listing: TListing) => (
            <div
              key={listing.listingId}
              className="flex justify-between items-center border p-3 rounded-md"
            >
              <div>
                <p className="font-medium">{listing.title}</p>
                <p className="text-sm text-muted-foreground">
                  {listing.category.title}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  ${listing.price}
                </p>
              </div>
              <Link
                href={`/listings/${listing.listingId}?orderId=${order.orderId}`}
                scroll={true}
                shallow={true}
              >
                <Button
                  variant="secondary"
                  className={cn(
                    "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90"
                  )}
                >
                  Review
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
