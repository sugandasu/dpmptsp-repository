import { ChakraProvider } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { LoadingFull } from "../components/LoadingFull";
import { request } from "../request";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request
      .sendRequest({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "/auth/refresh_token",
        data: {},
      })
      .then((response: AxiosResponse) => {
        request.setAccessToken(response.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <ChakraProvider resetCSS theme={theme}>
      {loading ? <LoadingFull /> : <Component {...pageProps} />}
    </ChakraProvider>
  );
}

export default MyApp;
