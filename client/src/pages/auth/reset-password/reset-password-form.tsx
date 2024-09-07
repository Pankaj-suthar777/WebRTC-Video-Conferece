import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import { cn } from "@/lib/utils";
import useResetPasswordMutation from "@/hooks/mutations/auth/useResetPasswordMutation";
import { PasswordInput } from "@/components/custom/password-input";

const formSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(1, {
        message: "Please enter your password",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    newPassword: z
      .string()
      .min(1, {
        message: "Please enter your password",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
    },
  });

  const { loading, resetPassword } = useResetPasswordMutation();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await resetPassword(data);
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button loading={loading} type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
