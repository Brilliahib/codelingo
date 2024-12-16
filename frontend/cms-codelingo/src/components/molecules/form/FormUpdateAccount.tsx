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
import { useSettingProfile } from "@/http/auth/update-account";
import {
  profileSettingSchema,
  profileSettingType,
} from "@/validators/auth/settings-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SettingProfileProps {
  session: Session;
}

export default function FormUpdateAccount({ session }: SettingProfileProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<profileSettingType>({
    defaultValues: {
      name: session.user.name,
      email: session.user.email,
      username: session.user.username,
    },
    mode: "onChange",
    resolver: zodResolver(profileSettingSchema),
  });

  const { mutate: settingProfileHandler, isPending } = useSettingProfile({
    onError: () => {
      toast({
        title: "Gagal Mengubah",
        description:
          "Gagal mengubah informasi akun, cek kembali dan coba lagi!",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil Mengubah",
        description: "Informasi akun berhasil diubah!",
        variant: "success",
      });
      router.push("/dashboard/profile");
    },
  });

  const onSubmit = (body: profileSettingType) => {
    settingProfileHandler({ ...body });
  };
  return (
    <>
      <div>
        <Form {...form}>
          <form
            className="space-y-5 md:space-y-8 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Masukkan username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Masukkan email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between md:pt-6 pt-4">
              <Link
                href={"/dashboard/profile/settings/password"}
                className="text-primary font-bold hover:underline uppercase"
              >
                Ubah Password
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
