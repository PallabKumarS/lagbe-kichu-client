"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import { TListing, TMongoose, TOrder } from "@/types";
import { Button } from "@/components/ui/button";
import {
  useCreatePaymentMutation,
  useGetSingleOrderQuery,
} from "@/redux/api/orderApi";
import LoadingData from "@/components/shared/LoadingData";
import { toast } from "sonner";

const orderStatusMap = {
  pending: 0,
  processing: 1,
  "out for delivery": 2,
  completed: 3,
  cancelled: 0,
};

const statusConfig = {
  pending: {
    color: "yellow",
    label: "Pending",
    icon: Clock,
  },
  processing: {
    color: "blue",
    label: "Processing",
    icon: CheckCircle,
  },
  "out for delivery": {
    color: "orange",
    label: "Out for Delivery",
    icon: Truck,
  },
  completed: {
    color: "green",
    label: "Completed",
    icon: CheckCircle,
  },
  cancelled: {
    color: "red",
    label: "Cancelled",
    icon: XCircle,
  },
};

const OrderStep = ({
  title,
  description,
  isActive,
  isCompleted,
}: {
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div
        className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${
          isCompleted
            ? "bg-green-500 text-white"
            : isActive
            ? "bg-yellow-500 text-white"
            : "bg-gray-200 text-gray-500"
        }
      `}
      >
        {isCompleted ? "✓" : isActive ? "●" : "○"}
      </div>
      <div>
        <h3
          className={`
          font-semibold 
          ${
            isCompleted
              ? "text-green-600"
              : isActive
              ? "text-yellow-600"
              : "text-gray-500"
          }
        `}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const OrderTracking = ({ orderId }: { orderId: string }) => {
  const { data, isFetching } = useGetSingleOrderQuery(orderId, {
    skip: !orderId,
    refetchOnMountOrArgChange: true,
  });
  const [createPayment] = useCreatePaymentMutation();

  const handleCreatePayment = async (item: TOrder) => {
    const toastId = toast.loading("Creating payment...");
    try {
      const res = await createPayment(item.orderId).unwrap();

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });

        setTimeout(() => {
          window.open(res?.data?.transaction?.paymentUrl, "_blank");
        }, 1000);
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
      console.log(error);
    }
  };

  if (isFetching) return <LoadingData />;

  const order = data?.data as TOrder & TMongoose;

  const currentStep = orderStatusMap[order.status || "pending"];
  const StatusIcon = statusConfig[order.status]?.icon || XCircle;
  const statusDetails = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order #{order.orderId}</span>
            <Badge
              variant={
                order.status === "processing"
                  ? "default"
                  : order.status === "out for delivery"
                  ? "secondary"
                  : order.status === "cancelled"
                  ? "destructive"
                  : "outline"
              }
              className="flex items-center gap-2"
            >
              <StatusIcon className="w-4 h-4" />
              {statusDetails.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {order.status !== "cancelled" ? (
            <div>
              <OrderStep
                title="Pending"
                description="Ordered | Awaiting owner response"
                isActive={currentStep === 0}
                isCompleted={currentStep > 0}
              />
              <OrderStep
                title="Processing"
                description="Being Ready for Delivery"
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              />
              <OrderStep
                title="Out for Delivery"
                description="On the way to your location"
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              />

              <OrderStep
                title="Completed"
                description="Order Completed"
                isActive={currentStep === 3}
                isCompleted={currentStep === 3}
              />
            </div>
          ) : (
            <div className="text-center text-red-500">
              <XCircle className="mx-auto mb-4 w-12 h-12" />
              <h3 className="text-xl font-semibold">Order Cancelled</h3>
              <p>
                Your order is cancelled either accidentally or you have done so
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-semibold text-green-600">${order.price}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.listingId?.map((item: TListing, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-gray-500">{item.category.title}</p>
                      </div>
                      <Badge variant="outline">${item.price}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {order.status === "pending" && order.paymentType === "payment" && (
            <div onClick={() => handleCreatePayment(order)}>
              <Button variant={"link"}>Go to payment page</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderTracking;
