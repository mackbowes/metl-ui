import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider } from "@chakra-ui/react";
import { metlTheme } from '../theme/metlTheme';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={metlTheme}>
			<Head>
			  <title>METL</title>
		  	</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
