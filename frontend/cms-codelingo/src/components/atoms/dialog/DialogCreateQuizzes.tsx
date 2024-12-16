"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  quizzesSchema,
  QuizzesType,
} from "@/validators/admin/quiz/quiz-validator";
import { useAddQuizzes } from "@/http/(admin)/quiz/create-quiz";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllLearningPath } from "@/http/(user)/learning/get-all-learning";
import { useSession } from "next-auth/react";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateQuizzes({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const { data: session, status } = useSession();
  const form = useForm<QuizzesType>({
    resolver: zodResolver(quizzesSchema),
    defaultValues: {
      title: "",
      description: "",
      learning_path_id: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addQuizzesHandler, isPending } = useAddQuizzes({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan quiz!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan quiz!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["quizzes-list"],
      });
      router.refresh();
    },
  });

  const { data } = useGetAllLearningPath(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const onSubmit = (body: QuizzesType) => {
    addQuizzesHandler(body);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Quiz</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="learning_path_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Path</FormLabel>
                  <FormControl>
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Daftar Learning Path" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Daftar Learning Path</SelectLabel>
                          {data?.data.map((learning) => (
                            <SelectItem
                              key={learning.id}
                              value={String(learning.id)}
                            >
                              {learning.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan judul quiz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan deskripsi quiz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
