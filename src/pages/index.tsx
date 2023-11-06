import Image from "next/image";
import { Inter } from "next/font/google";
import Logo from "@/components/Logo";
// import { protectRoutes } from "../../authorization/Authorization";
import { GetServerSidePropsContext } from "next";
import Layout from "../../Layout";
import Chat from "@/components/Chat";
import useFetch from "@/hooks/home/useChat";
import { useStore } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const id = useStore((store) => store.user._id);
  const addChatList = useStore((store) => store.addChatList);
  const addChats = useStore((store) => store.addChats);

  const url = `http://localhost:5000/api/chats/${id}`;
  const { data, error, isError, isFetching, isLoading, isFetched } =
    useFetch(url);
  console.log(data, error);

  if (isLoading || isFetching) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>Error reload page</div>;
  }

  if (isFetched) {
    console.log(data);
    addChats(data);
    addChatList(data, id);
  }
  return (
    <Layout>
      {/* <Logo /> */}
      <div>
        <Chat />
      </div>
    </Layout>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return protectRoutes(context);
// }
