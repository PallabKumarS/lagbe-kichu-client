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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { TOrder, TMeta, TMongoose, TListing } from "@/types";
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
  data: (TOrder & TMongoose)[];
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

  const availableStatuses: TOrder["status"][] = [
    "pending",
    "processing",
    "out for delivery",
    "completed",
    "cancelled",
  ];

  const renderStatusDropdown = (item: TOrder) => {
    const status = item.status;

    const getStatusClassName = (currentStatus: TOrder["status"]) => {
      switch (currentStatus) {
        case "processing":
          return "bg-green-100 text-green-600 hover:bg-green-200";
        case "pending":
          return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200";
        case "cancelled":
          return "bg-red-100 text-red-600 hover:bg-red-200";
        default:
          return "bg-gray-100 text-gray-600 hover:bg-gray-200";
      }
    };

    const getStatusTransition = (currentStatus: TOrder["status"]) => {
      switch (currentStatus) {
        case "processing":
          return "animate-pulse";
        case "pending":
          return "animate-bounce";
        case "cancelled":
          return "animate-shake";
        default:
          return "";
      }
    };

    if (user?.role !== "buyer" && user?.subRole !== "accountant") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`
            px-3 py-1 rounded-full 
            ${getStatusClassName(status)} 
            ${getStatusTransition(status)}
            transition-all duration-300 
            transform hover:scale-105 
            focus:outline-none 
            focus:ring-2 
            focus:ring-opacity-50 
            cursor-pointer 
            text-sm 
            font-semibold 
            shadow-sm
          `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableStatuses
              .filter((newStatus) => newStatus !== status)
              .map((newStatus) => (
                <DropdownMenuItem
                  key={newStatus}
                  onClick={() => {
                    if (status !== "completed") onStatusChange(item, newStatus);
                  }}
                  disabled={status === "completed"}
                  className={`
                  text-center 
                  hover:bg-gray-100 
                  transition-colors 
                  duration-200 
                  cursor-pointer
                `}
                >
                  {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      const handleClick = () => {
        if (item.paymentType !== "cash" && user.role !== "seller") {
          if (item.status === "pending") {
            handleCreatePayment(item);
          }
        }
      };

      return (
        <div
          onClick={handleClick}
          className={`
          px-3 py-1 rounded-full 
          ${getStatusClassName(status)}
          
          ${
            item.paymentType !== "cash"
              ? `transition-all duration-750  ${getStatusTransition(status)}`
              : ""
          }
          text-sm 
          font-semibold 
          shadow-sm 
          text-center
          mx-auto
          ${
            item.status === "pending"
              ? "cursor-pointer transform hover:scale-105"
              : ""
          }
          ${item.paymentType !== "cash" ? "hover:shadow-md" : ""}
        `}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    }
  };

  const columns: ColumnDef<TOrder & TMongoose>[] = [
    {
      accessorKey: "buyerId",
      header: "Buyer Info",
      cell: ({ row }: { row: { original: TOrder } }) => {
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
      cell: ({ row }: { row: { original: TOrder } }) => {
        const listings = row.original.listingId;

        return (
          <div className="text-center space-y-2">
            {listings.map((listing: TListing, index: number) => (
              <div key={index}>
                <span className="block">{listing.title}</span>
                <span className="text-xs text-gray-500 block">
                  ${listing.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "orderId",
      header: "Order ID",
      cell: ({ row }: { row: { original: TOrder } }) => (
        <div className="text-center">{row.original.orderId}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: TOrder } }) =>
        renderStatusDropdown(row.original),
    },
    {
      accessorKey: "createdAt",
      header: "Order Date",
      cell: ({ row }: { row: { original: TOrder & TMongoose } }) => (
        <div className="text-center">
          {new Date(row.original.createdAt).toLocaleString()}
        </div>
      ),
    },
    user?.role === "buyer" && {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: TOrder } }) => (
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
  ].filter(Boolean) as ColumnDef<TOrder & TMongoose>[];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border p-2">
      <Table>
        <TableCaption>Your Order List</TableCaption>
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
