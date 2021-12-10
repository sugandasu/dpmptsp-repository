import useSWR from "swr";
import { request } from "./request";

export const useUser = () => {
  const { data, error } = useSWR(
    {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/me",
    },
    request.fetcher
  );

  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  };
};
