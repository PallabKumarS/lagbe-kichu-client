import { TMongoose, TOrder } from "@/types";
import Link from "next/link";
import { MapPin, Clock, CheckCircle } from "lucide-react";

const AllTrack = ({ requests }: { requests: (TOrder & TMongoose)[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Requests</h1>

      {requests?.length === 0 ? (
        <div className="text-center text-gray-500">
          No requests found. Start creating your first request!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests?.map((request) => (
            <Link
              key={request?.orderId}
              href={`/dashboard/tenant/track/${request?.orderId}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {request?.listingId?.title || "Unnamed Request"}
                  </h2>
                  <span
                    className={`font-bold ${getStatusColor(
                      request?.status as string
                    )}`}
                  >
                    {request?.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-blue-500 w-5 h-5" />
                    <span>{request?.listingId.title}</span>
                  </div>

                  {request?.status === "processing" && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-2 w-5 h-5" />
                      <span>Approved Request</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrack;
