"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PasswordInput } from "../ui/password-input";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/AuthService";
import { useAppDispatch } from "@/redux/hook";
import { getMe } from "@/services/UserService";
import { Loader2Icon } from "lucide-react";
import { login } from "@/redux/features/authSlice";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("logging in...");
    try {
      const res = await loginUser(values);
      if (res?.success) {
        const user = await getMe();
        if (user?.success) {
          dispatch(login(user?.data));
        } else {
          toast.error(user?.message, { id: toastId });
        }
        toast.success(res?.message, { id: toastId });
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push("/dashboard/profile");
        }
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
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"}>
          {isSubmitting ? <Loader2Icon /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
