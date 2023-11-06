import useFetch from "@/hooks/home/useSingleChat";
import { useStore } from "@/store";
import moment from "moment";
import FormatDate from "@/utils/FormatDate";
import initials from "@/utils/initials";
import useFetchMessage from "@/hooks/home/useMessage";

const url = "http://localhost:5000/api/users";

const messageUrl =
  "http://localhost:5000/api/messages/65453354cb93743ed5fe0071";

type ChatlistProp = {
  id: string;
};

export default function ChatList({ id }: ChatlistProp) {
  const { data, isError, isLoading, isFetched } = useFetch(`${url}/${id}`, id);
  const chats = useStore((store) => store.chats);
  const addSingleChat = useStore((store) => store.addSingleChat);

  const chat = chats.find((chat) => chat?.members.includes(id));

  const handleChange = () => {
    console.log(chat);
    if (chat) {
      addSingleChat(chat);
    }
  };

  if (isFetched) {
    console.log(data);
  }
  return (
    <main
      className="flex  items-center w-full font-sans p-4 gap-4 border-b border-gray-300 hover:bg-gray-300"
      onClick={handleChange}
    >
      <section>
        <div className="bg-primary rounded-full text-2xl w-12 h-12 items-center justify-center flex text-white">
          <p>{data?.username && initials(data?.username)}</p>
        </div>
      </section>
      <section className="flex flex-col   w-full">
        <div className="w-full flex justify-between items-center ">
          <p className="text-xl">{data?.username}</p>
          <p className="text-xs">
            {data?.updatedAt && FormatDate(data?.updatedAt)}
          </p>
        </div>
        <div>
          <p className="text-sm">hi josh...</p>
        </div>
      </section>
    </main>
  );
}
