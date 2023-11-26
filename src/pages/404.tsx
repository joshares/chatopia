import React from "react";
import logo from "../../public/logo1.svg";
import Image from "next/image";
import Link from "next/link";

export default function index() {
  return (
    <main className="flex justify-center items-center flex-col">
      <header className="flex justify-center items-center bg-primary w-full">
        <Image src={logo} alt="logo" className="w-10" />
      </header>
      <div className="mx-auto text-2xl capitalize text-center pt-20 flex flex-col gap-5">
        <p>page not found </p>
        <Link href="/" className="bg-primary p-4 mt-10">
          Home
        </Link>
      </div>
    </main>
  );
}
