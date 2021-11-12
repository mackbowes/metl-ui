import "../styles/globals.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { metlTheme } from "../theme/metlTheme";
import { InjectedProviderFC } from "../contexts/InjectedProviderContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function METL({ Component, pageProps }) {
  useEffect(() => {
    window.onunload = () => {
      sessionStorage.clear();
    };
  });

  return (
    <ChakraProvider theme={metlTheme}>
      <InjectedProviderFC>
        <Head>
          <title>METL</title>
        </Head>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              border: `2px solid black`,
            },
          }}
        />
        <Component {...pageProps} />
      </InjectedProviderFC>
    </ChakraProvider>
  );
}

export default METL;
