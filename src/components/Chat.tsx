"use client";
import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { useStore } from "@/store";
import useFetchMessage from "@/hooks/home/useMessage";

const messageUrl =
  "http://localhost:5000/api/messages/65453354cb93743ed5fe0071";

export default function Chat() {
  const [showChats, setShowChats] = useState(false);
  const chatList = useStore((store) => store.chatList);
  const chats = useStore((store) => store.chats);

  console.log(chatList, chats);

  return (
    <main className=" w-full h-full">
      <section className=" w-full  flex items-center justify-between h-full">
        <div
          className={`md:w-2/5 w-full ${
            showChats ? "hidden md:flex" : "flex"
          } flex-col   overflow-y-scroll max-height`}
        >
          {chatList.map((id, index) => {
            return (
              <div onClick={() => setShowChats(true)} className="" key={index}>
                <ChatList id={id} />
              </div>
            );
          })}
        </div>
        <div
          className={` ${
            showChats ? "block" : "md:block hidden"
          } w-full md:w-3/5`}
        >
          <ChatBox />
        </div>
      </section>
    </main>
  );
}
