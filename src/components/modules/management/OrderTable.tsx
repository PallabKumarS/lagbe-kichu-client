/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Eye, MapPin, Ban, Trash2 } from "lucide-react";
import { TOrder, TMongoose, TMeta } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneUpdateModal from "./PhoneUpdateModal";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import ConfirmationBox from "@/components/shared/ConfirmationBox";

interface Props {
  data: (TOrder & TMongoose)[];
  meta: TMeta;
  onView: (order: TOrder & TMongoose) => void;
  onStatusChange: (data: TOrder & TMongoose, status?: string) => void;
  handleCreatePayment: (item: TOrder & TMongoose) => void;
  onDelete: (item: TOrder & TMongoose) => void;
}

export function OrderTable({
  data,
  meta,
  onView,
  onStatusChange,
  handleCreatePayment,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector(userSelector);

  function formatCellContent(
    content: any,
    prop: string,
    item: any
  ): React.ReactNode {
    if (item.isDeleted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-600">
          <Ban className="w-3.5 h-3.5" />
          On delete
        </span>
      );
    }
    if (prop === "status") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={() => setOpen(!open)}
            className={`px-2 py-1 rounded-md ${
              content === "approved"
                ? "bg-green-100 text-green-600"
                : content === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {content[0].toUpperCase() + content.slice(1)}
          </DropdownMenuTrigger>
          {user?.role === "seller" && (user?.phone as string) ? (
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === "processing" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "processing")
                }
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === "pending" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "pending")
                }
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === "cancelled" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "cancelled")
                }
              >
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : user?.role === "seller" ? (
            <PhoneUpdateModal
              user={user}
              request={item}
              open={open}
              setOpen={setOpen}
            />
          ) : user?.role === "admin" ? (
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === "processing" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "processing")
                }
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === "pending" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "pending")
                }
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === "rejected" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "rejected")
                }
              >
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : null}
        </DropdownMenu>
      );
    }
    if (prop === "transaction") {
      return user?.role === "seller" ? null : item?.status !== "rejected" &&
        item?.status !== "pending" &&
        user?.role === "buyer" ? (
        <Button
          onClick={() => {
            if (item?.status !== "paid") {
              if (handleCreatePayment) {
                handleCreatePayment(item);
              }
              if (router) {
                router.push(content.paymentUrl);
              }
            }
          }}
          size={"sm"}
          variant={
            item?.status !== "paid" && item?.status !== "rejected"
              ? "link"
              : "default"
          }
          className="py-1 rounded-md bg-green-200 text-green-600 hover:bg-amber-50 dark:hover:bg-blue-950"
        >
          {item?.status === "paid"
            ? content.paymentId
            : item?.status === "cancelled"
            ? "Payment Link"
            : "Pay"}
        </Button>
      ) : (
        <p className="py-1 rounded-md bg-red-300 text-red-600">
          {item?.status === "paid" ? "Paid" : "-"}
        </p>
      );
    }
    if (prop === "sellerId" || prop === "buyerId") {
      return (
        <div className="flex flex-wrap justify-center items-center space-x-2">
          <span className="text-primary font-semibold">
            {content.name || (prop === "sellerId" ? "Seller" : "Buyer")}
          </span>
          <span className="text-xs text-gray-500">({content.email})</span>
        </div>
      );
    }
    if (prop === "listingId") {
      return (
        <div className="flex flex-wrap justify-center items-center space-x-2">
          <MapPin className="w-4 h-4 text-primary" />
          <div>
            <p className="text-primary font-semibold">{content.title}</p>
            <p className="text-xs text-gray-500">
              {content.bedroomNumber} Bedrooms | ${content.price}/month
            </p>
          </div>
        </div>
      );
    }
    return content;
  }

  const heads = ["Seller Info", "Listing Info", "Buyer Info", "Status"];
  if (user?.role === "buyer") heads.push("Transaction", "Actions");

  const columns: ColumnDef<TOrder & TMongoose>[] = heads.map((head) => {
    const key = head
      .toLowerCase()
      .replace(" ", "")
      .replace("info", "Id") as keyof TOrder;

    if (head === "Actions") {
      return {
        header: head,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => onView(item)}>
                <Eye className="w-4 h-4" />
              </Button>

              <ConfirmationBox
                trigger={
                  <p className="flex items-center justify-center py-1 px-2 rounded-sm border border-input bg-background text-xs font-medium ring-offset-background transition-colors hover:bg-red-500 hover:text-white flex-1">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </p>
                }
                onConfirm={() => onDelete && onDelete(item)}
              />
            </div>
          );
        },
      };
    }

    return {
      accessorKey: key,
      header: head,
      cell: ({ row }) =>
        formatCellContent(row.getValue(key), key, row.original),
    } as ColumnDef<TOrder & TMongoose>;
  });

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
                <TableHead key={header.id}>
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
                  <TableCell key={cell.id}>
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
