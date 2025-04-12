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
import { Eye, Trash2, Ban } from "lucide-react";
import { TUser, TMongoose, TMeta } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";

type Props = {
  data: (TUser & TMongoose)[];
  meta: TMeta;
  onView: (user: TUser & TMongoose) => void;
  onDelete: (user: TUser & TMongoose) => void;
  onStatusChange: (user: TUser & TMongoose) => void;
  onRoleChange: (user: TUser & TMongoose, role: string) => void;
};

export function UserTable({
  data,
  meta,
  onView,
  onDelete,
  onStatusChange,
  onRoleChange,
}: Props) {
  const columns: ColumnDef<TUser & TMongoose>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;
        const content = user.role;

        if (user.isDeleted) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-600">
              <Ban className="w-3.5 h-3.5" />
              On delete
            </span>
          );
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`px-2 py-1 rounded-md ${
                content === "admin"
                  ? "bg-purple-100 text-purple-600"
                  : content === "seller"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {content}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === "admin"}
                onClick={() => onRoleChange(user, "admin")}
              >
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === "seller" || content === "admin"}
                onClick={() => onRoleChange(user, "seller")}
              >
                Seller
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === "buyer" || content === "admin"}
                onClick={() => onRoleChange(user, "buyer")}
              >
                Buyer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        const content = user.isActive;

        if (user.isDeleted) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-600">
              <Ban className="w-3.5 h-3.5" />
              On delete
            </span>
          );
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`px-2 py-1 rounded-md ${
                content
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {content ? "Active" : "Inactive"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={content === true}
                onClick={() => onStatusChange(user)}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === false}
                onClick={() => onStatusChange(user)}
              >
                Deactivate
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
                No users found.
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
