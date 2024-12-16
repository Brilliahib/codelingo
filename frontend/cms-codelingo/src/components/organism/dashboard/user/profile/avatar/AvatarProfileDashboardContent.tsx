"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUpdatePhotoProfile } from "@/http/auth/change-photo-profile";
import {
  updatePhotoProfileSchema,
  UpdatePhotoProfileType,
} from "@/validators/auth/change-photo-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const imageList = [
  "general.png",
  "zombie.png",
  "pirates.png",
  "dracula.png",
  "devil.png",
  "santa-1.png",
  "santa-2.png",
];

export default function AvatarProfileDashboardContent() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const defaultImage = session?.user?.image || "/images/profile/general.png";
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const initialImage =
      session?.user?.image?.split("/").pop() || "general.png";
    setSelectedImage(initialImage);
  }, [session]);

  const form = useForm<UpdatePhotoProfileType>({
    defaultValues: {
      image: selectedImage,
    },
    mode: "onChange",
    resolver: zodResolver(updatePhotoProfileSchema),
  });

  const { mutate: updatePhotoProfileHandler, isPending } =
    useUpdatePhotoProfile({
      onError: () => {
        toast({
          title: "Gagal",
          description: "Gagal mengubah foto profil!",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        toast({
          title: "Berhasil",
          description: "Foto profil berhasil diubah!",
          variant: "success",
        });
        router.push("/dashboard/profile/settings");
      },
    });

  const onSubmit = () => {
    const body = { image: selectedImage };
    updatePhotoProfileHandler(body);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    form.setValue("image", image);
  };

  return (
    <>
      <div className="flex flex-col lg:space-y-16 space-y-8">
        <div className="flex flex-col lg:space-y-16 space-y-8 items-center justify-center">
          <Image
            src={`/images/profile/${selectedImage}`}
            alt="profile-preview"
            height={100}
            width={100}
            className="rounded-full"
          />

          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto flex-nowrap no-scrollbar">
            {imageList.map((image) => (
              <Image
                key={image}
                src={`/images/profile/${image}`}
                alt={image}
                height={100}
                width={100}
                className={`rounded-full cursor-pointer transition-opacity duration-300 ${
                  selectedImage === image
                    ? "opacity-100 border-4 border-primary"
                    : "opacity-50"
                }`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Link href={"/dashboard/profile/settings"}>
            <Button variant={"secondary"}>Batalkan</Button>
          </Link>
          <Button onClick={onSubmit} disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </>
  );
}
