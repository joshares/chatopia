"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();
  const message = useStore((store) => store.message);
  const singleChat = useStore((store) => store.singleChat);
  const recipient = useStore((store) => store.recipient);
  const user = useStore((store) => store.user);
  const addOnlineUsers = useStore((store) => store.addOnlineUsers);

  useEffect(() => {
    const newSocket = io("http:localhost:8000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // get onlineUsers
  useEffect(() => {
    if (socket === null) return;
    console.log("works");
    socket.emit("addNewUser", user._id);
    socket?.on("getOnlineUsers", (res) => {
      addOnlineUsers(res);
      console.log(res);
    });

    return () => {
      socket?.off("getOnlineUsers");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // // send message
  useEffect(() => {
    if (socket === null) return;
    const recipientId = recipient?._id;

    socket.emit("sendMessage", { ...message, recipientId });
    console.log(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  // // receive message
  useEffect(() => {
    if (socket === null) return;
    console.log("working");
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

  return socket;
};

// type SocketProps = {
//   setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
// };

// export const newSocket = (
//   setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
// ) => {
//   // const [socket, setSocket] = useState<Socket | null>(null);

//   const newSocket = io("http://localhost:8000");
//   setSocket(newSocket);

//   return () => {
//     newSocket.disconnect();
//   };
// };

export const addSocketUser = (socket: Socket | null, userId: string) => {
  // const addOnlineUsers = useStore((store) => store.addOnlineUsers);
  if (socket === null) return;
  socket.emit("addNewUser", userId);
  // socket.on("getOnlineUsers", (res) => {
  //   addOnlineUsers(res);
  //   console.log(res);
  // });
};
// export const getSocketUser = (socket: Socket | null, userId: string) => {
//   if (socket === null) return;
// };
