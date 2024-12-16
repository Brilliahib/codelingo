"use client";

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
import { useToast } from "@/hooks/use-toast";
import { useUpdatePassword } from "@/http/auth/change-password";
import {
  updatePasswordSchema,
  updatePasswordType,
} from "@/validators/auth/change-password-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface UpdatePasswordProps {
  session: Session;
}

export default function FormUpdatePassword({ session }: UpdatePasswordProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<updatePasswordType>({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
    resolver: zodResolver(updatePasswordSchema),
  });

  const { mutate: updatePasswordHandler, isPending } = useUpdatePassword({
    onError: () => {
      toast({
        title: "Gagal",
        description: "Gagal mengubah password! Cek kembali password lama",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "Password berhasil diubah!",
        variant: "success",
      });
      router.push("/dashboard/profile/settings");
    },
  });

  const onSubmit = (body: updatePasswordType) => {
    updatePasswordHandler({ ...body });
  };
  return (
    <>
      <div>
        <Form {...form}>
          <form
            className="space-y-5 md:space-y-8 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Lama</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="current_password"
                      placeholder="Masukkan password lama"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Baru</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        id="new_password"
                        placeholder="Masukkan password baru"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password Baru</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        id="new_password_confirmation"
                        placeholder="Masukkan konfirmasi password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between pt-4">
              <Link href={"/dashboard/profile/settings"}>
                <Button variant={"secondary"}>Kembali</Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
