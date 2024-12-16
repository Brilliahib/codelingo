import flowchart from "/public/images/flowchart.gif";
import pairs from "/public/images/pairs.gif";
import liga from "/public/images/liga.gif";
import Image from "next/image";

export default function Reason() {
  return (
    <>
      <div className="my-24 flex flex-col items-center pad-x md:space-y-16 space-y-12">
        <h1 className="text-nature font-bold md:text-3xl text-2xl tracking-wider text-center">
          Kenapa Memilih CodeLingo?
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 md:gap-12 text-center md:text-left">
          <div className="flex flex-col space-y-4">
            <Image src={pairs} alt="pairs" width={500} height={500} />
            <h1 className="text-[#38B5FC] md:text-2xl text-xl font-bold">
              Program Belajar Interaktif
            </h1>
            <p className="opacity-80">
              Anak-anak belajar coding dengan materi visual yang menarik dan
              kuis interaktif seperti permainan, sehingga belajar terasa seru
              dan menyenangkan.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <Image src={flowchart} alt="flowchart" width={500} height={500} />
            <h1 className="text-[#38B5FC] md:text-2xl text-xl font-bold">
              Pendekatan Ramah Anak
            </h1>
            <p className="opacity-80">
              Pembelajaran dirancang khusus agar sesuai dengan kebutuhan
              anak-anak, menggunakan gambar berwarna-warni, animasi interaktif,
              dan narasi sederhana yang mudah dipahami.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <Image src={liga} alt="liga" width={500} height={500} />
            <h1 className="text-[#38B5FC] md:text-2xl text-xl font-bold">
              Belajar Seperti Bermain
            </h1>
            <p className="opacity-80">
              Pembelajaran dikemas seperti permainan, di mana anak-anak bisa
              mengumpulkan EXP, mencapai level baru, dan bersaing di liga
              leaderboard yang akan meningkatkan rasa percaya diri dan semangat
              anak untuk menyelesaikan tantangan berikutnya.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
