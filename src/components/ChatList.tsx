import useFetch from "@/hooks/home/useSingleChat";
import { useStore } from "@/store";
import { type } from "os";
import React from "react";
const url = "http://localhost:5000/api/users";
import FormatDate from "@/utils/FormatDate";
import initials from "@/utils/initials";

type ChatlistProp = {
  id: string;
};

export default function ChatList({ id }: ChatlistProp) {
  const { data, isError, isLoading, isFetched } = useFetch(`${url}/${id}`, id);
  if (isFetched) {
    console.log(data);
  }
  return (
    <main className="flex  items-center w-full font-sans p-4 gap-4 border-b border-gray-300 hover:bg-gray-300">
      <section>
        <div className="bg-primary rounded-full text-2xl w-12 h-12 items-center justify-center flex text-white">
          <p>{data?.username && initials(data?.username)}</p>
        </div>
      </section>
      <section className="flex flex-col   w-full">
        <div className="w-full flex justify-between items-center ">
          <p className="text-xl">{data?.username}</p>
          <p className="text-xs">
            {data?.updatedAt && FormatDate(data?.updatedAt)}
          </p>
        </div>
        <div>
          <p className="text-sm">hi josh...</p>
        </div>
      </section>
    </main>
  );
}
