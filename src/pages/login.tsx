import React from "react";
import LoginForm from "../components/LoginForm";
import logo from "../../public/logo.svg";
import girl from "../../public/textgirl.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex md:flex-row flex-col h-screen">
      {/* <Logo /> */}
      <div className="w-full md:w-1/2 h-screen pt-0 md:block hidden">
        <Image src={girl} alt="img" className="w-full h-full object-cover" />
      </div>
      <section className="w-full md:pt-20 md:w-1/2 p-10 h-screen">
        <div className="flex justify-end -mt-8 md:-mt-16 ">
          <Image src={logo} alt="logo" className="w-10" />
        </div>
        <div>
          <h1 className="text-3xl mb-10 text-black text-center font-bold md:mt-0 mt-10">
            Welcome Back!
          </h1>
          <LoginForm />
        </div>
        <p className="text-center py-5 text-xs mt-2">
          Don`t have an account?{" "}
          <Link href={"/signup"} className="text-blue-800">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}
