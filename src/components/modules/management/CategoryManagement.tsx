"use client";

import CategoryForm from "@/components/forms/CategoryForm";
import Container from "@/components/shared/Container";
import { Modal } from "@/components/shared/Modal";
import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory, TMongoose } from "@/types";
import { PaginationComponent } from "@/components/shared/Pagination";
import { useState } from "react";
import CategoryCard from "./CategoryCard";
import LoadingData from "@/components/shared/LoadingData";

const CategoryManagement = ({ query }: { query: Record<string, string> }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: categories, isFetching } = useGetAllCategoriesQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isFetching) return <LoadingData />;


  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-between gap-y-5 gap-x-2 mb-20">
        <div>
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight",
              "bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"
            )}
          >
            Manage Categories
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create and organize your listing categories
          </p>
        </div>

        <Modal
          title="Create Category"
          trigger={
            <Button
              variant="secondary"
              className={cn(
                "px-6 py-2 text-lg",
                "bg-gradient-to-r from-blue-500 to-indigo-500",
                "text-white hover:opacity-90 transition-opacity",
                "shadow-md hover:shadow-lg cursor-pointer"
              )}
              onClick={() => setModalOpen(true)}
            >
              Create Category
            </Button>
          }
          content={<CategoryForm setModal={() => setModalOpen(false)} />}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>

      {categories?.data?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(290px,100%),1fr))] lg:grid-cols-2 2xl:grid-cols-3 gap-4 mb-10">
          {categories?.data?.map((category: TCategory & TMongoose) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      <div className="mt-6 flex justify-center">
        <PaginationComponent meta={categories?.meta} />
      </div>
    </Container>
  );
};

export default CategoryManagement;
