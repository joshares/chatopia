"use client";
import { useState } from "react";
import { useStore } from "@/store";
import { UserType } from "@/types";
import initials from "@/utils/initials";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface FriendListProp {
  user: UserType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function FriendList({ user, setOpen }: FriendListProp) {
  const queryClient = useQueryClient();

  const id = useStore((store) => store.user.id);
  const [submitError, setSubmitError] = useState("");

  const { mutate: chat, isPending } = useMutation({
    mutationFn: async () => {
      setSubmitError("");
      const { data } = await axios.post(
        `${baseUrl}/api/chats`,
        {
          firstId: id,
          secondId: user?._id,
        },
        { withCredentials: true }
      );
      return data as any;
    },
    onError: (err: any) => {
      let error = "";
      if (err.response.statusText.length > 1) {
        error = err.response.statusText;
      } else if (err.response.data.length > 1) {
        error = err.response.data;
      } else {
        error = "Error, try to reload page";
      }
      setSubmitError(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [id] });
      setSubmitError("");
      console.log(data);
      setOpen(false);
    },
  });

  const handleClick = () => {
    if (id !== user._id) {
      chat();
    }
  };

  return (
    <main
      className="flex  items-center w-full font-sans p-4 gap-4 border-b border-gray-300 hover:bg-gray-300"
      onClick={handleClick}
    >
      {/* show error */}
      {submitError.length > 2 && (
        <div className=" text-red-600 text-center">
          <p>{submitError}</p>
        </div>
      )}

      <section>
        <div className="bg-primary rounded-full text-xl w-8 h-8 items-center justify-center flex text-white capitalize">
          <p>{user?.username && initials(user?.username)}</p>
        </div>
      </section>
      <section className="flex flex-col   w-full">
        <div className="w-full flex justify-between items-center ">
          <p className="text-xl capitalize">{user?.username}</p>
          <span className="text-red-400 text-sm capitalize">
            {id === user?._id && "this is you"}
          </span>
        </div>
      </section>
      <div>
        <BsFillChatDotsFill
          className="text-primary text-2xl cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </main>
  );
}
