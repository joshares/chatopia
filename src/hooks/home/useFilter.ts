import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export default function useFetch(url: string) {
  let users;
  const { data, isError, isLoading, isFetching, error, isFetched, refetch } =
    useQuery({
      queryKey: ["filter"],
      queryFn: async () => {
        const { data } = await axios.get(url, { withCredentials: true });
        users = data?.data?.users;
        return users as any;
      },
    });

  return {
    data,
    isError,
    isLoading,
    users,
    isFetching,
    error,
    isFetched,
    refetch,
  };
}
