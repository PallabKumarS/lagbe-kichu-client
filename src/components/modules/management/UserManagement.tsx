/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogComponent } from "@/components/shared/Dialog";
import LoadingData from "@/components/shared/LoadingData";
import { TableComponent } from "@/components/shared/Table";
import { useGetAllUsersQuery } from "@/redux/api/user/userApi";
import {
  deleteUser,
  updateUserRole,
  updateUserStatus,
} from "@/services/UserService";
import { TMongoose, TUser } from "@/types";
import { Ban } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const { data: users, isLoading } = useGetAllUsersQuery(
    { limit: 12 },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const [selectedUser, setSelectedUser] = useState<(TUser & TMongoose) | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "view">("view");

  const heads = ["Name", "Email", "Role", "Status", "Actions"];
  const cellProperties: (keyof TUser)[] = ["name", "email", "role", "isActive"];

  const handleDelete = async (user: TUser & TMongoose) => {
    const toastId = toast.loading("Deleting user...");
    try {
      const res = await deleteUser(user.userId);

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
      toast.error("Something went wrong", {
        id: toastId,
      });
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
      const res = await updateUserStatus(user.userId);
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
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleRole = async (user: TUser & TMongoose, role: string) => {
    const toastId = toast.loading("Updating user role...");
    try {
      const res = await updateUserRole(user.userId, role);
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
      toast.error("Something went wrong", {
        id: toastId,
      });
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

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <div>
      <TableComponent
        cellProperties={cellProperties}
        data={users?.data}
        heads={heads}
        meta={users?.meta}
        caption="User Management"
        onDelete={handleDelete}
        onView={handleView}
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
