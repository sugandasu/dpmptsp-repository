import axios, { Method } from "axios";
import jwtDecode from "jwt-decode";

let accessToken: string = "";

type sendRequestType = {
  method: Method;
  url: string;
  data?: any;
};

export const request = {
  sendRequest: ({ method, url, data = {} }: sendRequestType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios({
          method,
          url,
          data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        resolve(response);
      } catch (err) {
        return reject(err);
      }
    });
  },

  setAccessToken: (token: string) => {
    accessToken = token;
  },

  accessTokenExpired: (): boolean => {
    try {
      const decode: any = jwtDecode(accessToken);
      if (Date.now() >= decode.exp * 1000) {
        return true;
      } else {
        return false;
      }
    } catch {
      return true;
    }
  },
};
