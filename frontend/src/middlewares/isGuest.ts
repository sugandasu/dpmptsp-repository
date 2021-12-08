import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { refreshToken } from "../utils/refreshToken";
import { request } from "../utils/request";

const isGuest = async () => {
  const router = useRouter();
  const toast = useToast({
    title: "Authentication",
    position: "top-right",
    isClosable: true,
  });

  if (request.accessTokenExpired()) {
    await refreshToken();
  }

  await request
    .sendRequest({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/me",
      data: {},
    })
    .then((response: AxiosResponse) => {
      if (response && response.data.user) {
        toast({
          status: "info",
          description: `Selamat datang ${response.data.user.username}`,
        });
        if (typeof router.query.next === "string") {
          router.replace(router.query.next);
          return;
        }
        router.replace("/dashboard");
      }
    })
    .catch(() => {
      return;
    });
};

export default isGuest;
