import { Socket } from "socket.io-client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChatType, MessageType, User, UserType } from "@/types";

type Store = {
  user: User;
  socket: Socket | null;
  chats: ChatType[];
  singleChat: ChatType;
  message: MessageType;
  messages: MessageType[];
  recipient: UserType;
  onlineUsers: any[];
  addUser: (data: User) => void;
  addRecipient: (data: UserType) => void;
  addChats: (data: ChatType[]) => void;
  addMessage: (data: MessageType) => void;
  addSocket: (data: Socket) => void;
  addOnlineUsers: (data: any[]) => void;
  chatList: string[];
  addChatList: (data: ChatType[], id: string) => void;
  addSingleChat: (data: ChatType) => void;
};

export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {
          username: "",
          email: "",
          id: "",
        },
        chats: [],
        socket: null,
        message: {
          chat: "",
          sender: "",
          text: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
          _id: "",
        },
        messages: [],
        recipient: {
          createdAt: "",
          email: "",
          password: "",
          updatedAt: "",
          username: "",
          __v: 0,
          _id: "",
        },
        onlineUsers: [],
        singleChat: {
          createdAt: "",
          members: [""],
          updatedAt: "",
          __v: 0,
          _id: "",
        },
        addUser: (data) => {
          set((store) => ({
            user: data,
          }));
        },
        addMessage: (data) => {
          set((store) => ({
            message: data,
          }));
        },
        addSocket: (data) => {
          set((store) => ({
            socket: data,
          }));
        },
        addSingleChat: (data) => {
          set((store) => ({
            singleChat: data,
          }));
        },
        addRecipient: (data) => {
          set((store) => ({
            recipient: data,
          }));
        },
        addChats: (data: any[]) => {
          set((store) => ({
            chats: data,
          }));
        },
        addOnlineUsers: (data) => {
          set((store) => ({
            onlineUsers: data,
          }));
        },
        chatList: [],
        addChatList: (data, id) => {
          set((store) => {
            // const newChats = data;
            const list = [];
            for (const obj of data) {
              if (Array.isArray(obj.members)) {
                for (const recipient of obj.members) {
                  if (recipient !== id) {
                    list.push(recipient);
                  }
                }
              }
            }
            return {
              chatList: list,
            };
          });
        },
      }),
      { name: "userStore" }
    )
  )
);
