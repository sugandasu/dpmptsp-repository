import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { request } from "./request";

export const refreshToken = async () => {
  const router = useRouter();

  return await request
    .sendRequest({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/refresh-token",
      data: {},
    })
    .then((response: AxiosResponse) => {
      request.setAccessToken(response.data.accessToken);
    })
    .catch((err) => {
      console.log(err);
      router.push(`/login?next${router.pathname}`);
    });
};
