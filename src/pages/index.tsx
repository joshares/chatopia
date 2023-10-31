import Image from "next/image";
import { Inter } from "next/font/google";
import Logo from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Logo />
      <div>
        <p>joshua</p>
      </div>
    </main>
  );
}
