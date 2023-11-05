import React from "react";
import { AiOutlineSend } from "react-icons/ai";

export default function ChatBox() {
  return (
    <main className="w-full border border-gray-300 relative">
      <section className="bg-primary w-full p-4 text-center sticky  text-2xl text-white ">
        <p>Josh</p>
      </section>
      {/* where chats will show */}
      <section className="w-full    chats-max-height overflow-y-auto relative p-2">
        <div className="h-screen">kkkk</div>
      </section>
      <section className="w-full absolute left-0 right-0 bottom-0 p-3">
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
    </main>
  );
}
