import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export default function useFetch(url: string, key: string) {
  console.log(url);
  const { data, isError, isLoading, isFetching, error, isFetched } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data as any;
    },
  });

  return { data, isError, isLoading, isFetching, error, isFetched };
}
