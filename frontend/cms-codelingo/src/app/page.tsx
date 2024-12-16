import Footer from "@/components/organism/footer/Footer";
import ContentPanda from "@/components/organism/home/ContentPanda";
import HomeContent from "@/components/organism/home/HomeContent";
import Reason from "@/components/organism/home/Reason";
import TungguApaLagi from "@/components/organism/home/TungguApaLagi";
import Navbar from "@/components/organism/navbar/Navbar";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <HomeContent />
      <ContentPanda />
      <Reason />
      <TungguApaLagi />
      <Footer />
    </div>
  );
}
