import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { request } from "../utils/request";

const isAuth = async () => {
  const router = useRouter();
  const toast = useToast({
    title: "Authentication",
    position: "top-right",
    isClosable: true,
  });
  await request
    .sendRequest({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/me",
      data: {},
    })
    .then((response: AxiosResponse) => {
      if (response && response.data.user) {
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      toast({ status: "error", description: err.response.data.message });
      router.push(`/login?next=${router.pathname}`);
    });
};

export default isAuth;
