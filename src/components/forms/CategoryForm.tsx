"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { TCategory, TMongoose } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().url("Must be a valid image URL"),
  description: z.string().optional(),
});

type CategoryFormProps = {
  category?: TCategory & TMongoose;
  edit?: boolean;
  setModal: () => void;
};

export default function CategoryForm({
  category,
  edit = false,
  setModal,
}: CategoryFormProps) {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: category?.title || "",
      image: category?.image || "",
      description: category?.description || "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading(
      edit ? "Updating category..." : "Creating category..."
    );

    try {
      const res = edit
        ? await updateCategory({
            categoryId: category?._id as string,
            data: values,
          }).unwrap()
        : await createCategory(values).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset();
        setModal();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl py-10"
      >
        {/* Title Field */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Category title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL Field */}
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Paste category image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" variant="outline">
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : edit ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
