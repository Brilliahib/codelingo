"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import {
  registerSchema,
  RegisterType,
} from "@/validators/auth/register-validator";
import { useRegister } from "@/http/auth/register";

export default function RegisterForm() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  const { toast } = useToast();
  const router = useRouter();

  const {
    mutate: registerRequestHandler,
    isPending,
    data,
  } = useRegister({
    onError: (error) => {
      const errors = error.response?.data;

      Object.keys(errors).forEach((k) => {
        form.setError(k as keyof RegisterType, {
          type: "manual",
          message: errors[k][0],
        });
      });

      toast({
        title: "Gagal Daftar",
        description: "Gagal mendaftar, cek kembali data yang dimasukkan",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      const res = await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        redirect: false,
      });

      if (!res || res.error == "") {
        toast({
          title: "Gagal Masuk",
          description: "terjadi kesalahan, coba lagi.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil Mendaftar!",
        description: "Anda berhasil mendaftar",
        variant: "success",
      });
      return router.push("/dashboard/learning");
    },
  });

  const onSubmit = (body: RegisterType) => {
    registerRequestHandler({ ...body });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="border-0 bg-transparent shadow-transparent">
        <div className="w-full md:p-10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Register</CardTitle>
            <CardDescription>
              Selamat datang! Silahkan daftar menggunakan akun anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan nama"
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
                          id="email"
                          placeholder="Masukkan username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          placeholder="Masukkan email"
                          {...field}
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
                        <Input
                          type="password"
                          id="password"
                          placeholder="Masukkan password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Masukkan konfirmasi password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Daftar Akun"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Sudah punya akun?{" "}
                <Link href={"/login"}>
                  <span className="text-primary underline font-semibold">
                    Masuk Sekarang
                  </span>
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
