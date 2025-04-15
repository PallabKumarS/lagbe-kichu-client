"use client";

import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { TListing, TMongoose } from "@/types";
import { useAddDiscountMutation } from "@/redux/api/listingApi";
import { LoaderCircle } from "lucide-react";

// Zod schema for discount form
const discountFormSchema = z.object({
  discount: z.number().min(0).max(100),
  discountStartDate: z.date(),
  discountEndDate: z.date(),
});

interface DiscountFormProps {
  listing: TListing & TMongoose;
}

const DiscountForm = ({ listing }: DiscountFormProps) => {
  const [addDiscount, { isLoading }] = useAddDiscountMutation();

  type DiscountFormData = z.infer<typeof discountFormSchema>;
  const form = useForm<DiscountFormData>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: {
      discount: listing?.discount || 0,
      discountStartDate:
        new Date(listing?.discountStartDate || "") || new Date(),
      discountEndDate: new Date(listing?.discountEndDate || "") || new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof discountFormSchema>) => {
    const toastId = toast.loading("Adding discount...");

    try {
      const res = await addDiscount({
        listingId: listing.listingId,
        data: values,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        form.reset();
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Error adding discount", { id: toastId });
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-6"
      >
        {/* Discount */}
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter discount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Discount Start Date */}
        <FormField
          control={form.control}
          name="discountStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) => {
                    const dateString = e.target.value;
                    field.onChange(dateString ? new Date(dateString) : null);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Discount End Date */}
        <FormField
          control={form.control}
          name="discountEndDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) => {
                    const dateString = e.target.value;
                    field.onChange(dateString ? new Date(dateString) : null);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoading ? <LoaderCircle /> : "Add Discount"}
        </Button>
      </form>
    </Form>
  );
};

export default DiscountForm;
