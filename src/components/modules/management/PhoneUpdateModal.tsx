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

import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { updateRequest } from "@/services/RequestService";
import { TUser } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { login } from "@/redux/features/authSlice";
import { useUpdateUserMutation } from "@/redux/api/userApi";

const formSchema = z.object({
  sellerPhoneNumber: z.string().min(11).max(15),
});

const PhoneUpdateModal = ({
  user,
  request,
  open,
  setOpen,
}: {
  user: TUser | null;
  request: any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerPhoneNumber: (user?.phone as string) || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Updating phone number...");

    try {
      const res1 = await updateRequest(request?.requestId as string, {
        sellerPhoneNumber: values.sellerPhoneNumber,
      });

      if (res1?.success) {
        const res = await updateUser({
          userId: user?.userId as string,
          data: { phone: values.sellerPhoneNumber },
        }).unwrap();

        dispatch(login(res?.data));

        if (res?.success) {
          toast.success(res?.message, {
            id: toastId,
          });
          setOpen(false);
        } else {
          toast.error(res?.message, {
            id: toastId,
          });
        }
      } else {
        toast.error(res1?.message, {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.", {
        id: toastId,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogHeader></DialogHeader>
      <DialogContent className="p-6 bg-amber-50 dark:bg-teal-950">
        <h2 className="text-lg font-semibold mb-4">Update Your Phone</h2>

        <p className="">
          It will be needed for tenant to contact with you. It will also update
          your profile which you can change later
        </p>
        <DialogDescription></DialogDescription>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl py-10"
          >
            <FormField
              control={form.control}
              name="sellerPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneUpdateModal;
