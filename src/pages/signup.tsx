import Image from "next/image";
import girl from "../../public/textgirl.jpg";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import SignUpForm from "../components/SignUpForm";
import logo from "../../public/logo.svg";

// import { signIn } from "next-auth/react";

export default function RegisterPage() {
  // const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   // signIn("github");
  // };
  // const handleGoggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   // signIn("google");
  // };
  return (
    <main className=" flex flex-col justify-between md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-screen pt-0 md:block hidden">
        <Image src={girl} alt="img" className="w-full h-full object-cover" />
      </div>
      <section className="w-full md:w-1/2 p-10 md:pt-20 h-screen">
        <div className="flex justify-end -mt-8 md:-mt-16">
          <Image src={logo} alt="logo" className="w-10" />
        </div>
        <div>
          <h1 className="text-3xl mb-10 text-center font-bold">Sign up!</h1>
          <SignUpForm />
          <div className="">
            <div className="border rounded-md shadow-md text-gray-400 font-light text-xs flex items-center px-2 py-1.5 gap-2 cursor-pointer mx-auto w-max">
              <FcGoogle className="sm:text-xs text-2xl" />
              <button
                // onClick={handleGoggle}
                type="button"
                className="text-xs font-semibold "
              >
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
        <p className="text-center py-5 text-md mt-2">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-800">
            login
          </Link>
        </p>
      </section>
    </main>
  );
}
