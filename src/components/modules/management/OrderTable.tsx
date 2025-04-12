"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { TOrder, TMeta } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import ConfirmationBox from "@/components/shared/ConfirmationBox";

interface OrderTableProps {
  data: TOrder[];
  meta: TMeta;
  onView: (order: TOrder) => void;
  onStatusChange: (data: TOrder, status?: TOrder["status"]) => void;
  handleCreatePayment: (item: TOrder) => void;
  onDelete: (item: TOrder) => void;
}

export function OrderTable({
  data,
  meta,
  onView,
  onStatusChange,
  handleCreatePayment,
  onDelete,
}: OrderTableProps) {
  const user = useAppSelector(userSelector);
  const router = useRouter();

  const renderStatusDropdown = (item: TOrder) => {
    const status = item.status;

    const getStatusClassName = (currentStatus: TOrder["status"]) => {
      switch (currentStatus) {
        case "processing":
          return "bg-green-100 text-green-600";
        case "pending":
          return "bg-yellow-100 text-yellow-600";
        case "cancelled":
          return "bg-red-100 text-red-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    const availableStatuses: TOrder["status"][] = [
      "pending",
      "processing",
      "out for delivery",
      "completed",
      "cancelled",
    ];

    if (user?.role !== "buyer" && user?.subRole !== "accountant") {
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`px-2 py-1 rounded-md ${getStatusClassName(status)}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {availableStatuses
            .filter((newStatus) => newStatus !== status)
            .map((newStatus) => (
              <DropdownMenuItem
                key={newStatus}
                onClick={() => onStatusChange(item, newStatus)}
                className="text-center"
              >
                {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>;
    } else {
      if (item.paymentType === "cash") {
        return (
          <div
            className={`px-2 py-1 rounded-md ${getStatusClassName(
              status
            )} mx-auto text-center`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        );
      } else if (item.status === "pending") {
        return (
          <div
            onClick={() => handleCreatePayment(item)}
            className={`px-2 py-1 rounded-md cursor-pointer ${getStatusClassName(
              status
            )} mx-auto text-center`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        );
      } else {
        return (
          <div
            onClick={() => router.push(item.transaction?.paymentUrl as string)}
            className={`px-2 py-1 rounded-md cursor-pointer ${getStatusClassName(
              status
            )} mx-auto text-center`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        );
      }
    }
  };

  const columns: ColumnDef<TOrder>[] = [
    {
      accessorKey: "buyerId",
      header: "Buyer Info",
      cell: ({ row }) => {
        const buyer = row.original.buyerId;
        return (
          <div className="text-center">
            <span className="font-semibold block">{buyer.name}</span>
            <span className="text-xs text-gray-500 block">({buyer.email})</span>
          </div>
        );
      },
    },
    {
      accessorKey: "listingId",
      header: "Listing Info",
      cell: ({ row }) => {
        const listing = row.original.listingId[0];
        return (
          <div className="text-center">
            <span className="block">{listing.title}</span>
            <span className="text-xs text-gray-500 block">
              ${listing.price.toFixed(2)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "orderId",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="text-center">{row.original.orderId}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => renderStatusDropdown(row.original),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(row.original)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <ConfirmationBox
            trigger={
              <Button size="sm" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            }
            onConfirm={() => onDelete(row.original)}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-center">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}
