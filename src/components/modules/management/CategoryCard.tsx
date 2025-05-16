"use client";

import { TCategory, TMongoose } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/shared/Modal";
import CategoryForm from "@/components/forms/CategoryForm";
import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmationBox from "@/components/shared/ConfirmationBox";

type Props = {
  category: TCategory & TMongoose;
};

const CategoryCard = ({ category }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting category...");
    try {
      const res = await deleteCategory(category._id).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
       toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-4">
        <div className="relative w-full h-40 rounded-lg overflow-hidden">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{category.title}</h2>
          {category.description && (
            <p className="text-muted-foreground text-sm">
              {category.description}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Modal
            title="Edit Category"
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            trigger={
              <Button variant="outline" size="icon">
                <Pencil className="w-4 h-4" />
              </Button>
            }
            content={
              <CategoryForm
                setModal={() => setEditModalOpen(false)}
                category={category}
                edit={true}
              />
            }
          />
          <ConfirmationBox
            title="Delete Category"
            description="Are you sure you want to delete this category? This action cannot be undone."
            onConfirm={handleDelete}
            trigger={
              <Button variant="destructive" size="icon" disabled={isLoading}>
                <Trash2 className="w-4 h-4" />
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
