import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TungguApaLagi() {
  return (
    <>
      <div className="bg-[#273856] text-center w-full flex flex-col items-center justify-center gap-6 p-12">
        <h1 className="md:text-3xl text-2xl text-nature font-bold tracking-wider">
          Tunggu Apa Lagi?
        </h1>
        <p>Belajar coding semakin seru dengan CodeLingo!</p>
        <Button className="w-fit bg-yellow-300 border-yellow-600 hover:bg-yellow-300/80">
          <Link href={"/register"}>Daftar Sekarang</Link>
        </Button>
      </div>
    </>
  );
}
