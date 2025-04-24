/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogComponent } from "@/components/shared/Dialog";
import LoadingData from "@/components/shared/LoadingData";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi";
import { TMongoose, TUser } from "@/types";
import { Ban } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserTable } from "./UserTable";

const UserManagement = ({ query }: { query: Record<string, string> }) => {
  const { data: users, isFetching } = useGetAllUsersQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const [selectedUser, setSelectedUser] = useState<(TUser & TMongoose) | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");

  const handleDelete = async (user: TUser & TMongoose) => {
    const toastId = toast.loading("Deleting user...");
    try {
      const res = await deleteUser(user.userId).unwrap();

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.data.message, { id: toastId });
    }
  };

  const handleView = async (user: TUser & TMongoose) => {
    setSelectedUser(user);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleStatus = async (user: TUser & TMongoose) => {
    const toastId = toast.loading("Updating user status...");
    try {
      const res = await updateUserStatus(user.userId).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Error updating user status:", error);
      toast.error(error.data.message, { id: toastId });
    }
  };

  const handleRole = async (user: TUser & TMongoose, role: string) => {
    const toastId = toast.loading("Updating user role...");
    try {
      const res = await updateUserRole({ userId: user.userId, role }).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast.error(error.data.message, { id: toastId });
    }
  };

  const renderViewContent = (user: TUser & TMongoose) => (
    <div className="space-y-2">
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
      </p>
      {user?.isDeleted && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <span className="flex items-center gap-2 text-red-600 font-medium">
            <Ban className="w-4 h-4" />
            This user has been marked for deletion
          </span>
        </div>
      )}
    </div>
  );

  if (isFetching) return <LoadingData />;

  return (
    <div>
      <UserTable
        data={users?.data}
        meta={users?.meta}
        onView={handleView}
        onDelete={handleDelete}
        onStatusChange={handleStatus}
        onRoleChange={handleRole}
      />

      <DialogComponent
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
        data={selectedUser}
        title={modalMode === "edit" ? "Edit User" : "User Details"}
        renderViewContent={renderViewContent}
      />
    </div>
  );
};

export default UserManagement;
