import useFetch from "@/hooks/home/useSingleChat";
import { useStore } from "@/store";
import FormatDate from "@/utils/FormatDate";
import initials from "@/utils/initials";
import useFetchMessage from "@/hooks/home/useMessage";
import { useState } from "react";
import { MessageType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const url = `${baseUrl}/api/users`;
const messageUrl = `${baseUrl}/api/messages`;

type ChatlistProp = {
  id: string;
};

export default function ChatList({ id }: ChatlistProp) {
  const queryClient = useQueryClient();
  const { data, isError, isLoading, isFetched } = useFetch(`${url}/${id}`, id);
  const chats = useStore((store) => store.chats);
  const addSingleChat = useStore((store) => store.addSingleChat);
  const addRecipient = useStore((store) => store.addRecipient);
  const chat = chats.find((chat) => chat?.members.includes(id));
  const onlineUsers = useStore((store) => store.onlineUsers);
  const {
    data: messages,
    isError: messageError,
    isLoading: Loading,
    isFetched: fetched,
  } = useFetchMessage(`${messageUrl}/${chat?._id}`, `${chat?._id}`);
  let lastMessage;

  const handleChange = () => {
    if (chat) {
      addSingleChat(chat);
    }
    addRecipient(data);
  };

  if (fetched) {
    lastMessage = messages[messages.length - 1];
    console.log(messages, lastMessage);
    // setMessage(lastMessage);
  }
  if (isLoading) {
    console.log(messages);
  }
  return (
    <main
      className="flex  items-center w-full font-sans p-4 gap-4 border-b border-gray-300 hover:bg-gray-300"
      onClick={handleChange}
    >
      <section>
        <div className="bg-primary rounded-full text-2xl w-12 h-12 items-center justify-center flex text-white capitalize">
          <p>{data?.username && initials(data?.username)}</p>
        </div>
      </section>
      <section className="flex flex-col   w-full">
        <div className="w-full flex justify-between items-center ">
          <p className="text-xl capitalize">
            {data?.username}{" "}
            {onlineUsers?.find((user) => user.userId === id) && (
              <span className="text-xs lowercase text-green-300">online</span>
            )}
          </p>
          <p className="text-xs">
            {lastMessage?.createdAt && FormatDate(lastMessage?.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-sm">{lastMessage?.text.slice(0, 10)}</p>
        </div>
      </section>
    </main>
  );
}
