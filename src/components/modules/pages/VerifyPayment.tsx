import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calendar,
  CreditCard,
  User,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Success":
      return (
        <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-300" />
      );
    case "Failed":
      return <XCircle className="w-12 h-12 text-red-500 dark:text-red-300" />;
    case "Cancel":
      return (
        <AlertCircle className="w-12 h-12 text-yellow-500 dark:text-yellow-300" />
      );
    default:
      return (
        <AlertCircle className="w-12 h-12 text-gray-500 dark:text-gray-300" />
      );
  }
};

export default function VerifyPayment({ requestData }: { requestData: any }) {
  const getStatusVariant = () => {
    switch (requestData?.bank_status) {
      case "Success":
        return "default";
      case "Failed":
        return "destructive";
      default:
        return "secondary";
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-primary-foreground">
        Payment Verification
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Payment Status
              <StatusIcon status={requestData?.bank_status} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 text-center">
              <h2
                className={`text-2xl font-bold mb-4 ${
                  requestData?.bank_status === "Success"
                    ? "text-green-600 dark:text-green-300"
                    : requestData?.bank_status === "Failed"
                    ? "text-red-600 dark:text-red-300"
                    : "text-yellow-600 dark:text-yellow-300"
                }`}
              >
                Payment {requestData?.bank_status}
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Transaction ID:
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {requestData?.bank_trx_id || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Amount:
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {requestData?.currency} {requestData?.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Order Number:
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {requestData?.customer_order_id}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Link
              href={`/dashboard/tenant/track/${requestData?.customer_order_id}`}
            >
              <Button size="lg" variant={getStatusVariant()}>
                Track Your Orders <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Transaction Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-6">
              {/* Transaction Date */}
              <div className="flex items-center gap-4 mb-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <Calendar className="w-6 h-6 text-primary dark:text-primary-foreground" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Transaction Date
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {new Date(requestData?.date_time).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary dark:text-primary-foreground" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {requestData?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary dark:text-primary-foreground" />
                  <span className="text-gray-900 dark:text-gray-100">
                    {requestData?.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary dark:text-primary-foreground" />
                  <span className="text-gray-900 dark:text-gray-100">
                    Method: {requestData?.method}
                  </span>
                </div>
              </div>

              {/* Additional Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{requestData?.invoice_no}</Badge>
                <Badge variant="secondary">{requestData?.sp_code}</Badge>
                <Badge variant="secondary">{requestData?.sp_message}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
