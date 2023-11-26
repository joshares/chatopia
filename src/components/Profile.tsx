"use client";
import { useStore } from "@/store";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

type ProfileProps = {
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profile: boolean;
};

export default function Profile({ profile, setProfile }: ProfileProps) {
  const [edit, setEdit] = useState(false);
  const user = useStore((store) => store.user);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <main
      className={`h-screen absolute z-20 w-full bg-white transform transition-transform  duration-500 ease-in-out ${
        profile ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <section>
        <div className="flex items-end bg-primary p-4 pb-8 text-3xl text-white h-[10rem]">
          <div onClick={() => setProfile(false)} className="cursor-pointer">
            <MdOutlineArrowBackIosNew />
          </div>
          <p className="text-center mx-auto ">Profile</p>
        </div>
      </section>
      <section>
        <form
          className="flex flex-col justify-center gap-6  w-full p-4"
          onSubmit={handleSubmit}
        >
          <article className="text-xl flex flex-col">
            <label
              htmlFor="username"
              className="text-primary text-sm capitalize"
            >
              Username
            </label>
            <div className="flex justify-between items-center">
              <p>{user?.username}</p>
              <AiOutlineUser />
            </div>
          </article>
          <article className="text-xl flex flex-col">
            <label htmlFor="email" className="text-primary text-sm capitalize">
              Email
            </label>
            <div className="flex justify-between items-center gap-36">
              <p>{user?.email}</p>
              <AiOutlineMail />
            </div>
          </article>
          <button
            type="submit"
            className="bg-primary rounded-md text-white w-max p-4 px-8"
          >
            Save
          </button>
        </form>
      </section>
    </main>
  );
}
