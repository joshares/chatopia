"use client";
import Image from "next/image";
import logo from "../../public/logo1.svg";

export default function Error() {
  return (
    <main className="flex justify-center items-center flex-col">
      <header className="flex justify-center items-center bg-primary w-full">
        <Image src={logo} alt="logo" className="w-10" />
      </header>
      <div className="mx-auto text-2xl capitalize text-center pt-20">
        <p>Error loading page </p>
        <p>please reload</p>
      </div>
    </main>
  );
}
