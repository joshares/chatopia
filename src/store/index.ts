import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChatType } from "@/types";

type Store = {
  user: any;
  chats: ChatType[];
  singleChat: ChatType;
  addUser: (data: any) => void;
  addChats: (data: any[]) => void;
  chatList: string[];
  addChatList: (data: ChatType[], id: string) => void;
  addSingleChat: (data: ChatType) => void;
};

export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        chats: [],
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
        addSingleChat: (data) => {
          set((store) => ({
            singleChat: data,
          }));
        },
        addChats: (data: any[]) => {
          set((store) => ({
            chats: data,
          }));
        },
        chatList: [],
        addChatList: (data, id) => {
          set((store) => {
            const newChats = data;
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
