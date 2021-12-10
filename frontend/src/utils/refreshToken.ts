import { AxiosResponse } from "axios";
import { request } from "./request";

export const refreshToken = async () => {
  return await request
    .sendRequest({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/refresh-token",
      data: {},
    })
    .then((response: AxiosResponse) => {
      if (response.data.status === 200) {
        request.setAccessToken(response.data.accessToken);
      } else {
        request.setAccessToken("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
