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
import { TMongoose, TUser } from "@/types";

const Profile = ({ user }: { user: TUser & TMongoose }) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto p-6">
        {/* image with user name email and settings */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              {user?.profileImage ? (
                <AvatarImage src={user?.profileImage} alt={user?.name} />
              ) : (
                <AvatarImage src="https://github.com/shadcn.png" />
              )}
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <Badge variant="outline" className="mt-2">
                {user?.role}
              </Badge>
            </div>
          </div>
          <Link href="/dashboard/settings">
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
              <span>{user?.phone || "No phone number added"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span>{user?.address || "No address added"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>
                Joined:{" "}
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>Contact: {user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-gray-500" />
              <span>User ID: {user?.userId}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Account Status</span>
              <div className="flex gap-3">
                <Badge variant={user?.isActive ? "default" : "destructive"}>
                  {user?.isActive ? "Active" : "Inactive"}
                </Badge>
                {user?.isDeleted && (
                  <Badge variant="destructive">Account Deleted</Badge>
                )}
              </div>
            </div>
            {user?.passwordChangedAt && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Password Last Changed</span>
                <span>
                  {new Date(user.passwordChangedAt).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Account Type</span>
              <span className="capitalize">{user?.role} Account</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Last Updated</span>
              <span>
                {new Date(user?.updatedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
