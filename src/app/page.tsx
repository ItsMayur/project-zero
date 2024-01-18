import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "./components/Layout/Navbar";

export default function Home() {
  return (
    <main className="bg-themeColor2 h-screen">
      <div className="text-text1">
        <Navbar />
      </div>
    </main>
  );
}
