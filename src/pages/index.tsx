import Image from "next/image";
import { Inter } from "next/font/google";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import Loading from "@/components/Loading";
import useFetchUser from "@/hooks/home/useLoginUser";

export default function Home() {
  const {
    data: user,
    error,
    isError,
    isFetching,
    isLoading,
    isFetched,
  } = useFetchUser();
  const addUser = useStore((store) => store.addUser);
  console.log("what is happeneing");
  const router = useRouter();

  if (isLoading || isFetching) {
    return (
      <main>
        <Logo />
        <div>
          <Loading />
        </div>
      </main>
    );
  }
  if (isError) {
    console.log(error);
    // return <Error />;
    router.push("/login");
    return null;
  }

  if (isFetched) {
    console.log("fetched");
    addUser(user.user);
    router.push("/chat");
    return null;
  }
  return (
    <main>
      <Logo />
    </main>
  );
}
