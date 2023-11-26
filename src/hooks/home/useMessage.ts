import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export default function useFetchMessage(url: string, key: string) {
  const { data, isError, isLoading, isFetching, error, isFetched, isSuccess } =
    useQuery({
      queryKey: [key],
      queryFn: async () => {
        const { data } = await axios.get(url, { withCredentials: true });
        return data as any;
      },
    });

  return { data, isError, isLoading, isFetching, error, isFetched, isSuccess };
}
