"use client";
import FriendList from "./FriendList";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
import useFetch from "@/hooks/home/useFilter";
import { UserType } from "@/types";

type FriendsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const url = `${baseUrl}/api/users?username=`;

export default function Friend({ open, setOpen }: FriendsProps) {
  const [search, setSearch] = useState("");
  const { isError, isFetched, isLoading, isFetching, data, users, refetch } =
    useFetch(`${url}${search}`);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    refetch();
    setSearch("");
  };

  if (isFetched) {
    console.log(data);
  }
  return (
    <main
      className={`h-screen absolute z-20 w-full bg-white transform transition-transform  duration-500 ease-in-out ${
        open ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="flex justify-center items-center p-2">
        <div className="" onClick={() => setOpen(false)}>
          <MdOutlineArrowBackIosNew className="text-2xl cursor-pointer" />
        </div>
        <form
          className="flex justify-center items-center p-2 w-full gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            required
            value={search}
            onChange={handleInputChange}
            placeholder="search for colleagues username"
            className=" w-full rounded-md bg-gray-300 outline-none p-2"
          />
          <button type="submit" className="">
            <AiOutlineSearch className="text-2xl" />
          </button>
        </form>
      </nav>
      <div className="max-height overflow-auto">
        {data?.length > 0 ? (
          data?.map((user: UserType, i: number) => {
            return (
              <div key={i}>
                <FriendList user={user} setOpen={setOpen} />
              </div>
            );
          })
        ) : (
          <div className=" text-red-600 text-center">
            <p>No User</p>
          </div>
        )}
      </div>
    </main>
  );
}
