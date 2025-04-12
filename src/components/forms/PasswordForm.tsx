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
import { PasswordInput } from "../ui/password-input";
import { LoaderCircleIcon } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/api/authApi";

const formSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
  newPasswordConfirmed: z.string().min(1),
});

export default function PasswordForm() {
  const [passwordChange] = useChangePasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const newPassword = form.watch("newPassword");
  const newPasswordConfirmed = form.watch("newPasswordConfirmed");

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Updating password...");
    try {
      const res = await passwordChange({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId });
      } else {
        toast.error(res?.message, { id: toastId });
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
        className="space-y-8 max-w-3xl md:px-5 py-10"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your old password"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your new password"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password field  */}
        <FormField
          control={form.control}
          name="newPasswordConfirmed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password again"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              {newPasswordConfirmed && newPassword !== newPasswordConfirmed ? (
                <FormMessage>Passwords do not match</FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <Button
          variant={"outline"}
          disabled={!!(newPassword !== newPasswordConfirmed)}
          type="submit"
        >
          {isSubmitting ? <LoaderCircleIcon /> : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
