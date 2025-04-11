import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, CreditCard, Truck, XCircle } from "lucide-react";
import { TMongoose, TOrder } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const orderStatusMap = {
  pending: 0,
  processing: 1,
  paid: 2,
  "out for delivery": 3,
  completed: 4,
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
  paid: {
    color: "green",
    label: "Paid",
    icon: CreditCard,
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

const RequestTracking = ({ request }: { request: TOrder & TMongoose }) => {
  const currentStep = orderStatusMap[request.status || "pending"];
  const StatusIcon = statusConfig[request.status]?.icon || XCircle;
  const statusDetails = statusConfig[request.status] || statusConfig.pending;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order #{request.orderId}</span>
            <Badge
              variant={
                request.status === "processing"
                  ? "default"
                  : request.status === "paid"
                  ? "secondary"
                  : request.status === "cancelled"
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
          {request.status !== "cancelled" ? (
            <div>
              <OrderStep
                title="Pending"
                description="Requested | Awaiting owner response"
                isActive={currentStep === 0}
                isCompleted={currentStep > 0}
              />
              <OrderStep
                title="Approved"
                description="Owner approved your request"
                isActive={currentStep === 1}
                isCompleted={currentStep > 1}
              />
              <OrderStep
                title="Paid"
                description="Payment Received"
                isActive={currentStep === 2}
                isCompleted={currentStep > 2}
              />
            </div>
          ) : (
            <div className="text-center text-red-500">
              <XCircle className="mx-auto mb-4 w-12 h-12" />
              <h3 className="text-xl font-semibold">Order Cancelled</h3>
              <p>
                Your request is cancelled either accidentally or you have done
                so
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
                {new Date(request.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-semibold text-green-600">
                ${request.listingId.price}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            <Card>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{request.listingId.title}</h4>
                    <p className="text-gray-500">
                      {request.listingId.category}
                    </p>
                  </div>
                  <Badge variant="outline">
                    ${request.listingId.price}/month
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href={`/verify-payment?order_id=${request.transaction?.paymentId}`}
          >
            <Button variant={"link"}>Go to verify page</Button>
          </Link>
          {request.status !== "paid" && (
            <Link href={`${request.transaction?.paymentUrl}`}>
              <Button variant={"link"}>Go to payment page</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RequestTracking;
