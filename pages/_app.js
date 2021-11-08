import "../styles/globals.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { metlTheme } from "../theme/metlTheme";
import { InjectedProvider } from "../contexts/InjectedProviderContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.onunload = () => {
      sessionStorage.clear();
    };
  });

  return (
    <ChakraProvider theme={metlTheme}>
      <InjectedProvider>
        <Head>
          <title>METL</title>
        </Head>
        <Component {...pageProps} />
      </InjectedProvider>
    </ChakraProvider>
  );
}

export default MyApp;
