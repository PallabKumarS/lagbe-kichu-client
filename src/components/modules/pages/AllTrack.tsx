"use client";

import { TMongoose, TOrder } from "@/types";
import Link from "next/link";
import { CheckCircle, LucideBox } from "lucide-react";
import { useGetPersonalOrdersQuery } from "@/redux/api/orderApi";
import LoadingData from "@/components/shared/LoadingData";

const AllTrack = ({ query }: { query: Record<string, string> }) => {
  const { data, isFetching } = useGetPersonalOrdersQuery(query, {
    skip: !query,
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) return <LoadingData />;

  const orders = data?.data as (TOrder & TMongoose)[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "processing":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      {orders?.length === 0 ? (
        <div className="text-center text-gray-500">
          No orders found. Start creating your first order!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order) => (
            <Link
              key={order?.orderId}
              href={`/dashboard/tenant/track/${order?.orderId}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-500">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order?.orderId}
                  </h2>
                  <span
                    className={`font-bold ${getStatusColor(order?.status)}`}
                  >
                    {order?.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  {order?.listingId?.map((listing, idx) => (
                    <div key={idx} className="flex items-center">
                      <LucideBox className="mr-2 text-blue-500 w-5 h-5" />
                      <span>{listing.title}</span>
                    </div>
                  ))}

                  {order?.status === "processing" && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-2 w-5 h-5" />
                      <span>Approved Order</span>
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
