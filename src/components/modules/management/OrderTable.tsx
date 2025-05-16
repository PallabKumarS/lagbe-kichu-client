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
import { TOrder, TMeta, TMongoose, TListing } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";

interface OrderTableProps {
  data: (TOrder & TMongoose)[];
  meta: TMeta;
  onStatusChange: (data: TOrder, status?: TOrder["status"]) => void;
}

export function OrderTable({ data, meta, onStatusChange }: OrderTableProps) {
  const user = useAppSelector(userSelector);

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
        case "out for delivery":
          return "bg-purple-100 text-purple-600 hover:bg-purple-200";
        case "completed":
          return "bg-blue-100 text-blue-600 hover:bg-blue-200";
        default:
          return "bg-gray-100 text-gray-600 hover:bg-gray-200";
      }
    };

    const getStatusTransition = (currentStatus: TOrder["status"]) => {
      switch (currentStatus) {
        case "processing":
          return "hover:animate-pulse";
        case "pending":
          return "hover:animate-bounce";
        case "cancelled":
          return "hover:animate-[shake_1s_ease-in-out_infinite]";
        case "out for delivery":
          return "hover:animate-[fade_1s_ease-in-out_infinite]";
        case "completed":
          return "hover:animate-[wiggle_1s_ease-in-out_infinite]";
        default:
          return "hover:animate-[fade_1s_ease-in-out_infinite]";
      }
    };

    if (user?.subRole !== "accountant") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`
            px-3 py-1 rounded-full 
            ${getStatusClassName(status)} 
            ${getStatusTransition(status)}
            transition-all duration-1000 
            transform hover:scale-105 
            focus:outline-none 
            focus:ring-2 
            focus:ring-opacity-50 
            text-sm 
            font-semibold 
            shadow-sm
          `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background/80">
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
                `}
                >
                  {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className="rounded-md border p-2"
      style={{
        overscrollBehavior: "contain",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <Table
        className="w-full"
        style={{
          tableLayout: "auto",
          width: "100%",
        }}
      >
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
