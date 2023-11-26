import useFetchMessage from "@/hooks/home/useMessage";
import { useStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import FormatDate from "@/utils/FormatDate";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const url = `${baseUrl}/api/messages`;

type ChatBoxProps = {
  setShowChats: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatBox({ setShowChats }: ChatBoxProps) {
  const queryClient = useQueryClient();
  const id = useStore((store) => store.singleChat._id);
  const recipient = useStore((store) => store.recipient);
  const addMessage = useStore((store) => store.addMessage);
  const userId = useStore((store) => store.user.id);
  const [submitError, setSubmitError] = useState("");
  const [text, setText] = useState("");

  const {
    data: message,
    isError,
    isLoading,
    isFetched,
    isSuccess,
  } = useFetchMessage(`${url}/${id}`, id);

  if (isSuccess) {
    console.log(message, recipient);
  }

  const { mutate: send, isPending } = useMutation({
    mutationFn: async () => {
      setSubmitError("");
      const { data } = await axios.post(
        `${baseUrl}/api/messages`,
        {
          chat: id,
          sender: userId,
          text: text,
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
      console.log(err, submitError);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [id] });
      // addNewMessages(data);
      addMessage(data);
      setText("");
      console.log(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send();
    console.log("submited");
  };

  return (
    <main className="w-full   bg-[url('../../public/chat-bg.jpg')]   h-screen  z-20 text-black">
      <section className="bg-primary w-full p-4 text-center   text-2xl text-white flex items-center">
        <MdOutlineArrowBackIosNew
          className="md:hidden pointer-events-auto cursor-pointer"
          onClick={() => setShowChats(false)}
        />
        <p className="mx-auto capitalize">{recipient?.username}</p>
      </section>
      {/* where chats will show */}
      <div>
        <section className="w-full    chats-max-height overflow-y-auto relative flex flex-col gap-3  p-2">
          {message?.map((chat: any, i: number) => {
            return (
              <div
                key={i}
                className={`flex items-center  ${
                  chat?.sender === userId
                    ? "justify-end self-end "
                    : "justify-start "
                }`}
              >
                <p
                  className={`p-2 rounded-md max-w-[10rem] relative pb-8 min-w-[5rem] ${
                    chat?.sender === userId
                      ? " bg-primary text-white"
                      : " bg-white"
                  }`}
                >
                  {chat?.text}
                  <span className="text-[0.65rem]  p-2 whitespace-nowrap absolute bottom-0 right-0">
                    {chat?.createdAt && FormatDate(chat?.createdAt)}
                  </span>
                </p>
              </div>
            );
          })}
        </section>
        <section className="w-full bg-gray-200 p-3">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end items-end gap-2">
              <textarea
                name="text"
                value={text}
                onChange={(e) => {
                  console.log(text);
                  setText(e.target.value);
                }}
                required
                className="w-full outline-none bg-white h-28 overflow-y-scroll p-2 text-black"
              ></textarea>
              <button
                type="submit"
                className="bg-primary rounded-full  w-10 h-10 flex justify-center items-center"
              >
                <AiOutlineSend className="text-white" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
