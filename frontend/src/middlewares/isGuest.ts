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
    refreshToken();
  }

  await request
    .sendRequest({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/me",
      data: {},
    })
    .then((response: AxiosResponse) => {
      if (response.status === 200) {
        if (response && response.data.user) {
          toast({
            status: "success",
            description: `Selamat datang ${response.data.user.username}`,
          });
          if (typeof router.query.next === "string") {
            router.replace(router.query.next);
            return;
          }
          router.replace("/dashboard");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default isGuest;
