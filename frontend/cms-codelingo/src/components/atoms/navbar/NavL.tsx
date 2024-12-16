import Image from "next/image";

import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              alt="Charing Cub"
              width={1000}
              height={1000}
              className="max-w-[150px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
