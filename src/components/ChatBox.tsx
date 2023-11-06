import useFetchMessage from "@/hooks/home/useMessage";
import { useStore } from "@/store";
import React from "react";
import { AiOutlineSend } from "react-icons/ai";

const url = "http://localhost:5000/api/messages";

export default function ChatBox() {
  const id = useStore((store) => store.singleChat._id);
  const userId = useStore((store) => store.user._id);

  const {
    data: message,
    isError,
    isLoading,
    isFetched,
  } = useFetchMessage(`${url}/${id}`, id);

  if (isFetched) {
    console.log(message);
  }

  return (
    <main className="w-full border border-gray-300 relative bg-black text-white max-height ">
      <section className="bg-primary w-full p-4 text-center sticky  text-2xl text-white ">
        <p>Josh</p>
      </section>
      {/* where chats will show */}
      <div>
        <section className="w-full    chats-max-height overflow-y-auto relative  p-2">
          {message?.map((chat: any, i: number) => {
            return (
              <div
                key={i}
                className={`flex items-center  ${
                  chat?.sender === userId
                    ? "justify-end self-end bg-primary"
                    : "justify-start bg-slate-600"
                }`}
              >
                <p className="">{chat?.text}</p>
              </div>
            );
          })}
        </section>
        <section className="w-full bg-black p-3">
          <form>
            <div className="flex justify-end items-end gap-2">
              <textarea
                name="text"
                className="w-full outline-none bg-gray-200 h-28 overflow-y-scroll p-2"
              ></textarea>
              <div className="bg-primary rounded-full  w-10 h-10 flex justify-center items-center">
                <AiOutlineSend className="text-white" />
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
