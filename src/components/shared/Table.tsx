/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Edit, Eye, MapPin, Trash2 } from "lucide-react";
import { TMeta, TMongoose, TRequest, TUser } from "@/types";
import { PaginationComponent } from "./Pagination";
import ConfirmationBox from "./ConfirmationBox";
import { Button } from "../ui/button";
import NoData from "./NoData";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPayment } from "@/services/RequestService";
import PhoneUpdateModal from "../modules/management/PhoneUpdateModal";
import { Dispatch, SetStateAction, useState } from "react";

type TTableProps<T> = {
  data: (T & TMongoose)[];
  heads: string[];
  meta: TMeta;
  caption?: string;
  cellProperties: (keyof T)[];
  onDelete?: (item: T & TMongoose) => void;
  onEdit?: (item: T & TMongoose) => void;
  onView?: (item: T & TMongoose) => void;
  onStatusChange?: (data: T & TMongoose, status?: string) => void;
  onRoleChange?: (user: T & TMongoose, role: string) => void;
};

export function TableComponent<T>({
  data,
  heads,
  meta,
  caption,
  cellProperties,
  onDelete,
  onView,
  onEdit,
  onStatusChange,
  onRoleChange,
}: TTableProps<T>) {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(userSelector);
  const pathname = usePathname();
  const router = useRouter();

  const handleCreatePayment = async (item: TRequest & TMongoose) => {
    const toastId = toast.loading("Creating payment...");
    try {
      const res = await createPayment(item.requestId);

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });

        setTimeout(() => {
          window.open(res?.data?.transaction?.paymentUrl, "_blank");
        }, 1000);
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Error creating payment", {
        id: toastId,
      });
    }
  };

  if (!data || data.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full border rounded-lg shadow-md">
      <Table className="overflow-x-auto">
        {caption && (
          <TableCaption className="text-lg font-semibold mb-4">
            {caption}
          </TableCaption>
        )}

        {/* headers here  */}
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            {heads.map((head, index) => (
              <TableHead
                key={index}
                className={`
                  font-bold 
                  text-gray-700 
                  dark:text-gray-200
                  text-center
                `}
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* table data here  */}
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {cellProperties.map((prop, index) => (
                <TableCell
                  key={index}
                  className={`
                    py-3 
                    ${index === 0 ? "font-medium" : ""}
                    text-center
                  `}
                >
                  {formatCellContent(
                    item[prop],
                    prop,
                    item,
                    user,
                    open,
                    setOpen,
                    onStatusChange,
                    onRoleChange,
                    handleCreatePayment,
                    router
                  )}
                </TableCell>
              ))}

              {/* actions cell  */}
              <TableCell className="flex items-center justify-center gap-2">
                {/* view action  */}
                {pathname.includes("requests")
                  ? user?.role === "tenant" &&
                    onView && (
                      <Button
                        onClick={() => onView && onView(item)}
                        size="sm"
                        variant="outline"
                        className="flex items-center justify-center hover:bg-blue-500 hover:text-white"
                      >
                        <Eye className="h-4 w-4 text-blue-500" />
                      </Button>
                    )
                  : onView && (
                      <Button
                        onClick={() => onView && onView(item)}
                        size="sm"
                        variant="outline"
                        className="flex items-center justify-center hover:bg-blue-500 hover:text-white"
                      >
                        <Eye className="h-4 w-4 text-blue-500" />
                      </Button>
                    )}

                {/* edit action  */}
                {onEdit && !(item as any)?.isDeleted && (
                  <Button
                    onClick={() => onEdit && onEdit(item)}
                    size="sm"
                    variant="outline"
                    className="flex items-center justify-center hover:bg-green-500 hover:text-white"
                  >
                    <Edit className="h-4 w-4 text-green-500" />
                  </Button>
                )}

                {/* delete action  */}
                {pathname.includes("requests")
                  ? onDelete &&
                    user?.role !== "landlord" &&
                    !(item as any)?.isDeleted && (
                      <ConfirmationBox
                        trigger={
                          <p
                            className="flex items-center justify-center py-1 px-2 rounded-sm border border-input bg-background text-xs font-medium ring-offset-background transition-colors hover:bg-red-500 hover:text-white flex-1
"
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </p>
                        }
                        onConfirm={() => onDelete && onDelete(item)}
                      />
                    )
                  : onDelete &&
                    !(item as any)?.isDeleted && (
                      <ConfirmationBox
                        trigger={
                          <p
                            className="flex items-center justify-center py-1 px-2 rounded-sm border border-input bg-background text-xs font-medium ring-offset-background transition-colors hover:bg-red-500 hover:text-white flex-1
"
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </p>
                        }
                        onConfirm={() => onDelete && onDelete(item)}
                      />
                    )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-center">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}

// content manage
function formatCellContent<T>(
  content: any,
  prop: string | number | symbol,
  item: any,
  user: TUser | null,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  onStatusChange?: (data: T & TMongoose, status?: string) => void,
  onRoleChange?: (user: T & TMongoose, role: string) => void,
  handleCreatePayment?: (item: TRequest & TMongoose) => void,
  router?: any
): React.ReactNode {
  if (item.isDeleted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-600">
        <Ban className="w-3.5 h-3.5" />
        On delete
      </span>
    );
  } else {
    if (typeof content === "boolean") {
      // for user status only
      if (prop === "isActive") {
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
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === false}
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      // for listing boolean values
      if (prop === "isAvailable") {
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
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Make Available
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={content === false}
                onClick={() => onStatusChange && onStatusChange(item)}
              >
                Make Rented
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }

    // for user role only
    if (prop === "role") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`px-2 py-1 rounded-md ${
              content === "admin"
                ? "bg-purple-100 text-purple-600"
                : content === "landlord"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {content}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={content === "admin"}
              onClick={() => onRoleChange && onRoleChange(item, "admin")}
            >
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={content === "landlord" || content === "admin"}
              onClick={() => onRoleChange && onRoleChange(item, "landlord")}
            >
              Landlord
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={content === "tenant" || content === "admin"}
              onClick={() => onRoleChange && onRoleChange(item, "tenant")}
            >
              Tenant
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (typeof content === "number") {
      return content.toLocaleString();
    }

    if (content instanceof Date) {
      return content.toLocaleDateString();
    }

    // For request status
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

          {/* for landlord role  */}
          {user?.role === "landlord" && (user?.phone as string) ? (
            <DropdownMenuContent className="">
              <DropdownMenuItem
                disabled={content === "approved" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "approved")
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
          ) : (
            user?.role === "landlord" && (
              <PhoneUpdateModal
                user={user}
                request={item}
                open={open}
                setOpen={setOpen}
              />
            )
          )}

          {/* for admin role  */}
          {user?.role === "admin" && (
            <DropdownMenuContent className="">
              <DropdownMenuItem
                disabled={content === "approved" || content === "paid"}
                onClick={() =>
                  onStatusChange && onStatusChange(item, "approved")
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
          )}
        </DropdownMenu>
      );
    }

    // For transaction status
    if (prop === "transaction") {
      if (user?.role === "landlord") {
        return null;
      } else {
        return item?.status !== "rejected" &&
          item?.status !== "pending" &&
          user?.role === "tenant" ? (
          // <Link href={`${item?.status === "paid" ? "" : content.paymentUrl}`}>
          <Button
            onClick={() => {
              item?.status !== "paid" &&
                item?.status !== "rejected" &&
                handleCreatePayment &&
                handleCreatePayment(item);
              item?.status !== "paid" &&
                item?.status !== "rejected" &&
                router &&
                router.push(item?.status === "paid" ? "" : content.paymentUrl);
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
          // </Link>
          <p className="py-1 rounded-md  bg-red-300 text-red-600">
            {item?.status === "paid" ? "Paid" : "-"}
          </p>
        );
      }
    }

    // For user IDs (landlord and tenant)
    if (prop === "landlordId") {
      return (
        <div className="flex flex-wrap justify-center items-center space-x-2">
          <span className="text-primary font-semibold">
            {content.name || "Landlord"}
          </span>
          <span className="text-xs text-gray-500">({content.email})</span>
        </div>
      );
    }

    // For user IDs (tenant)
    if (prop === "tenantId") {
      return (
        <div className="flex flex-wrap justify-center items-center mt-auto space-x-2">
          <span className="text-primary font-semibold">
            {content.name || "Tenant"}
          </span>
          <span className="text-xs text-gray-500">({content.email})</span>
        </div>
      );
    }

    // for listing id only
    if (prop === "listingId") {
      return (
        <div className="flex flex-wrap justify-center items-center space-x-2">
          <MapPin className="w-4 h-4 text-primary" />
          <div>
            <p className="text-primary font-semibold">
              {content.houseLocation}
            </p>
            <p className="text-xs text-gray-500">
              {content.bedroomNumber} Bedrooms | ${content.rentPrice}/month
            </p>
          </div>
        </div>
      );
    }

    return content;
  }
}
