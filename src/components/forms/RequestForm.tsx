"use client";

import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { TListing, TMongoose, TUser } from "@/types";
import { Checkbox } from "../ui/checkbox";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { createRequest } from "@/services/RequestService";

const formSchema = z.object({
  tenantId: z.string().min(1),
  moveInDate: z.string().min(1),
  rentDuration: z.string().min(1),
  message: z.string().optional(),
  checkBox: z.boolean(),
});

type RequestModalProps = {
  listing: TListing & TMongoose;
  user: TUser | null;
};

export default function RequestForm({ listing, user }: RequestModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantId: user?.userId || "",
      moveInDate: "",
      rentDuration: "",
      message: "",
      checkBox: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = useForm();

  const checkBoxValue = form.watch("checkBox");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Submitting your request...");

    const request = {
      tenantId: user?.userId,
      listingId: listing.listingId,
      landlordId: listing.landlordId.userId,
      moveInDate: values.moveInDate,
      rentDuration: values.rentDuration,
      message: values.message,
      status: "pending",
    };

    try {
      const res = await createRequest(request);

      if (res.success) {
        toast.success("Request submitted successfully!", {
          id: toastId,
        });
      } else {
        toast.error(res?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl py-10"
      >
        <FormField
          control={form.control}
          name="tenantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Info</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  placeholder="Your Information"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="moveInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Move In Date (Likely)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your move-in date"
                  type="date"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rentDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rental Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="For how long you want to rent eg. six months"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter anything you wish to specify"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkBox"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field?.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex gap-1">
                  Agree to our
                  <Link href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>
                  ?
                </FormLabel>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button disabled={!checkBoxValue} variant={"default"} type="submit">
          {isSubmitting ? <Loader2 /> : "Request"}
        </Button>
      </form>
    </Form>
  );
}
