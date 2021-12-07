import axios, { Method } from "axios";

let accessToken: string = "";

type sendRequestType = {
  method: Method;
  url: string;
  data: any;
};

export const request = {
  sendRequest: ({ method, url, data }: sendRequestType) => {
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

  setToken: (token: string) => {
    accessToken = token;
  },
};
