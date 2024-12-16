import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface CardPhotoProfileParams {
  session: Session;
}

export default function CardPhotoProfile({ session }: CardPhotoProfileParams) {
  return (
    <>
      <div className="flex flex-col items-center justify-center lg:space-y-6 space-y-4">
        <Image
          src={session.user.image ?? "/images/profile/general.png"}
          alt="profile"
          height={100}
          width={100}
          className="rounded-full"
        />
        <div>
          <Link
            href={"/dashboard/profile/settings/avatar"}
            className="uppercase text-primary font-bold text-xl hover:underline"
          >
            Ubah Avatar
          </Link>
        </div>
      </div>
      <hr className="border-t-2 border-[#90A3BD]" />
    </>
  );
}
