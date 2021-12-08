import { AxiosResponse } from "axios";
import { request } from "./request";

export const refreshToken = async () => {
  return await request
    .sendRequest({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_URL + "/auth/refresh_token",
      data: {},
    })
    .then((response: AxiosResponse) => {
      request.setAccessToken(response.data.accessToken);
    })
    .catch((_) => {});
};
