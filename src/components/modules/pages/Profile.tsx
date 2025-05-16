"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  Settings,
  Mail,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/userApi";
import LoadingData from "@/components/shared/LoadingData";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { data: user, isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    dispatch(setUser(user?.data));
  }, [user, dispatch]);

  if (isFetching) {
    return <LoadingData />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-5xl mx-auto p-6">
        {/* image with user name email and settings */}
        <div className="space-y-4 md:flex justify-between items-start mb-6">
          <div className="space-y-3 md:flex items-center gap-4">
            <Avatar className="h-24 w-24">
              {user?.data?.profileImage ? (
                <AvatarImage
                  src={user?.data?.profileImage}
                  alt={user?.data?.name}
                />
              ) : (
                <AvatarImage src="https://github.com/shadcn.png" />
              )}
              <AvatarFallback>{user?.data?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.data?.name}</h1>
              <p className="text-gray-600">{user?.data?.email}</p>
              <Badge variant="outline" className="mt-2">
                {user?.data?.role}
              </Badge>
            </div>
          </div>
          {/* settings button */}
          <Link href="/dashboard/settings" className="">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>

        {/* user info */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-gray-500" />
              <span>{user?.data?.phone || "No phone number added"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span>{user?.data?.address || "No address added"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>
                Joined:{" "}
                {new Date(
                  user?.data?.createdAt || Date.now()
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>Contact: {user?.data?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-gray-500" />
              <span>User ID: {user?.data?.userId}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Account Status</span>
              <div className="flex gap-3">
                <Badge
                  variant={user?.data?.isActive ? "default" : "destructive"}
                >
                  {user?.data?.isActive ? "Active" : "Inactive"}
                </Badge>
                {user?.data?.isDeleted && (
                  <Badge variant="destructive">Account Deleted</Badge>
                )}
              </div>
            </div>
            {user?.data?.passwordChangedAt && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Password Last Changed</span>
                <span>
                  {new Date(user?.data.passwordChangedAt).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Account Type</span>
              <span className="capitalize">{user?.data?.role} Account</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Last Updated</span>
              <span>
                {new Date(
                  user?.data?.updatedAt || Date.now()
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
