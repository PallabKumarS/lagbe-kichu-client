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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Edit } from "lucide-react";
import { TListing, TMongoose, TMeta } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";

type Props = {
  data: (TListing & TMongoose)[];
  meta: TMeta;
  onView: (listing: TListing & TMongoose) => void;
  onDelete: (listing: TListing & TMongoose) => void;
  onStatusChange: (listing: TListing & TMongoose) => void;
  onEdit: (listing: TListing & TMongoose) => void;
};

export function ListingTable({
  data,
  meta,
  onView,
  onDelete,
  onStatusChange,
  onEdit,
}: Props) {
  const columns: ColumnDef<TListing & TMongoose>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const listing = row.original;
        return `$${listing.price}`;
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "isAvailable",
      header: "Status",
      cell: ({ row }) => {
        const listing = row.original;
        const content = listing.isAvailable;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`px-2 py-1 rounded-md ${
                content
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {content ? "Available" : "Not Available"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === true}
                onClick={() => onStatusChange(listing)}
              >
                Mark as Available
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === false}
                onClick={() => onStatusChange(listing)}
              >
                Mark as Not Available
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(row.original)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
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
                No listings found.
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
