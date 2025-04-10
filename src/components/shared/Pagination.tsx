"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TMeta } from "@/types";
import { useRouter } from "next/navigation";

export function PaginationComponent({ meta }: { meta: TMeta }) {
  const router = useRouter();

  const handlePagination = (page: number) => {
    router.push(`listings?page=${page}`);
  };

  return (
    <Pagination className="mb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePagination(meta?.page - 1)}
            className={meta?.page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {Array(meta?.totalPage)
          .fill("*")
          .map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={meta?.page === index + 1}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePagination(meta.page + 1)}
            className={
              meta?.page >= meta?.totalPage
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
