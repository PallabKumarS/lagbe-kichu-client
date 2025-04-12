"use client";

import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Loader2Icon, Plus } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { userSelector } from "@/redux/features/authSlice";
import { TListing, TMongoose } from "@/types";
import {
  useCreateListingMutation,
  useUpdateListingMutation,
} from "@/redux/api/listingApi";

const formSchema = z.object({
  title: z.string().min(1),
  price: z.number(),
  description: z.string().min(1),
  category: z.string().min(1),
  images: z.array(z.object({ value: z.string().min(1) })),
});

type listingFormProps = {
  listing?: TListing & TMongoose;
  edit?: boolean;
};

export default function ListingForm({
  listing,
  edit = false,
}: listingFormProps) {
  const user = useAppSelector(userSelector);

  const [createListing] = useCreateListingMutation();
  const [updateListing] = useUpdateListingMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: listing?.title || "",
      price: listing?.price || 0,
      category: listing?.category || "",
      description: listing?.description || "",
      images: listing?.images.map((img) => {
        return { value: img };
      }) || [{ value: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendImage, fields: imageFields } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const addImage = () => {
    appendImage({ value: "" });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(
      edit ? "Updating listing..." : "Creating listing..."
    );
    const images = values.images.map((image) => image.value);

    const data = {
      ...values,
      images,
      sellerId: user?.userId as string,
    };

    if (edit) {
      const editData = {
        ...values,
        images,
        sellerId: listing?.sellerId.userId as string,
      };

      try {
        const res = await updateListing({
          listingId: listing?.listingId as string,
          data: editData,
        }).unwrap();
        if (res.success) {
          toast.success(res.message, {
            id: toastId,
          });
          form.reset();
        } else {
          toast.error(res.message, {
            id: toastId,
          });
        }
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    } else {
      try {
        const res = await createListing(data).unwrap();
        if (res.success) {
          toast.success(res.message, {
            id: toastId,
          });
          form.reset();
        } else {
          toast.error(res.message, {
            id: toastId,
          });
        }
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 overflow-y-auto"
      >
        {/* title field  */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title of the listing"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* price field  */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the price"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* images field  */}
        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">
              Add Appropriate Images
            </p>
            <Button
              variant="outline"
              className="size-10"
              onClick={addImage}
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {imageFields.map((imageField, index) => (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={`images.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Paste image URL"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* description field  */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed description of the house"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* category field  */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Specify a category for the listing"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={"outline"}
          type="submit"
          disabled={imageFields.length === 0}
        >
          {isSubmitting ? <Loader2Icon /> : edit ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
