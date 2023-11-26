"use client";
import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { useStore } from "@/store";
import useFetchMessage from "@/hooks/home/useMessage";
import { io, Socket } from "socket.io-client";
import Navbar from "./Navbar";
import Friend from "./Friend";
import Profile from "./Profile";
// import { useSocket } from "@/hooks/socket/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { connectSocket } from "@/hooks/socket/useSocket";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const url = "http://localhost:5000/api/messages";

export default function Chat() {
  const queryClient = useQueryClient();
  const [showChats, setShowChats] = useState(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  // const chatList = useStore((store) => store.chatList);
  const addOnlineUsers = useStore((store) => store.addOnlineUsers);
  const onlineUsers = useStore((store) => store.onlineUsers);
  const chatList = useStore((store) => store.chatList);
  const message = useStore((store) => store.message);
  const singleChat = useStore((store) => store.singleChat);
  const recipient = useStore((store) => store.recipient);
  const user = useStore((store) => store.user);
  console.log(onlineUsers);
  const newList = chatList.slice().reverse();

  // // connect users
  useEffect(() => {
    connectSocket(setSocket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // get onlineUsers
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?.id);
    socket?.on("getOnlineUsers", (res) => {
      addOnlineUsers(res);
      console.log(res);
    });

    return () => {
      socket?.off("getOnlineUsers");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // // // send  and receive message
  useEffect(() => {
    if (socket === null) return;
    const recipientId = recipient?._id;

    socket.emit("sendMessage", { ...message, recipientId });
    console.log(message);
    socket?.on("getMessage", (res) => {
      queryClient.invalidateQueries({ queryKey: [singleChat._id] });

      console.log("oya");
      console.log(res, "and", singleChat?._id);
      if (singleChat?._id !== res.chat) return;

      console.log(res);
    });

    return () => {
      socket?.off("getMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, message]);

  // // // // receive message
  // useEffect(() => {
  //   if (socket === null) return;
  //   console.log("working");
  //   socket?.on("getMessage", (res) => {
  //     queryClient.invalidateQueries({ queryKey: [singleChat._id] });

  //     console.log("oya");
  //     console.log(res, "and", singleChat?._id);
  //     if (singleChat?._id !== res.chat) return;

  //     console.log(res);
  //   });

  //   return () => {
  //     socket?.off("getMessage");
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket, message]);

  return (
    <main className=" w-full h-full">
      <section className=" w-full  flex items-center justify-between h-full">
        <div
          className={`md:w-2/5 w-full ${
            showChats ? "hidden md:flex" : "flex"
          } flex-col   overflow-y-scroll h-screen relative`}
        >
          <Navbar setOpen={setOpen} setProfile={setProfile} />
          {<Friend open={open} setOpen={setOpen} />}
          {<Profile profile={profile} setProfile={setProfile} />}
          {newList.map((id, index) => {
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
          } w-full relative max-h-screen md:w-3/5 bg-[url('../../public/chat-bg.jpg')]`}
        >
          {showChats ? (
            <ChatBox setShowChats={setShowChats} />
          ) : (
            <div className="bg-[url('../../public/chat-bg.jpg')] h-screen"></div>
          )}
        </div>
      </section>
    </main>
  );
}
