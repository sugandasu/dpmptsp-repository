import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LoadingFull } from "../components/LoadingFull";
import theme from "../theme";
import { refreshToken } from "../utils/refreshToken";
import { request } from "../utils/request";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (request.accessTokenExpired()) {
      refreshToken().finally(() => {
        setLoading(false);
      });
    }
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      {loading ? <LoadingFull /> : <Component {...pageProps} />}
    </ChakraProvider>
  );
}

export default MyApp;
