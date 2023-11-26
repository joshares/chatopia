import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function useFetchUser() {
  const { data, isError, isLoading, isFetching, error, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}/api/user`, {
        withCredentials: true,
      });
      return data as any;
    },
  });

  return {
    data,
    isError,
    isLoading,
    isFetching,
    error,
    isFetched,
  };
}
