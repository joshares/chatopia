"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo1.svg";

export default function Logo() {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    // Close the component after 3 seconds
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 3000); // 5000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <main className={`w-full fixed inset-0 z-20 ${!animate && "preloader "}`}>
      <div className="h-screen w-full bg-primary flex items-center justify-center">
        <Image src={logo} alt="logo" className="animate-bounce " />
      </div>
    </main>
  );
}
