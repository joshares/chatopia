import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// interface User {

// }
// type AddtaskProp = {
//   <title></title>
// }
type Store = {
  user: any;
  addUser: (data: any) => void;
  chatList: string[];
  addChatList: (data: any, id: string) => void;
};

export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        addUser: (data: any) => {
          set((store) => ({
            user: data,
          }));
        },
        chatList: [],
        addChatList: (data, id) => {
          set((store) => {
            const targetId = store.user.id;
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

            return { chatList: list };
          });
        },
      }),
      { name: "userStore" }
    )
  )
);

// type Task = {
//   title: string;
//   state: string;
// };

// type StoreState = {
//   tasks: Task[];
// };

// type StoreActions = {
//   set: SetState<StoreState>;
// };
