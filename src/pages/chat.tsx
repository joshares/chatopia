import Image from "next/image";
import { Inter } from "next/font/google";
import Chat from "@/components/Chat";
import useFetch from "@/hooks/home/useChat";
import { useStore } from "@/store";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Chats() {
  const id = useStore((store) => store.user.id);
  const addChatList = useStore((store) => store.addChatList);
  const addChats = useStore((store) => store.addChats);
  const access = process.env.ACCESS;
  const url = `${baseUrl}/api/chats/${id}`;
  const { data, error, isError, isFetching, isLoading, isFetched } = useFetch(
    url,
    id
  );
  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  if (isFetched && id) {
    addChats(data);
    addChatList(data, id);
  }
  return (
    <main>
      {/* <Logo /> */}
      <div>
        <Chat />
      </div>
    </main>
  );
}
