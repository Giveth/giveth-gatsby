import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ApolloProvider } from "@apollo/client";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ThemeProvider } from "theme-ui";
import theme from "../src/utils/theme-ui";
import { client } from "../src/apollo/client";
import SEO from "../next-seo.config";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Web3ReactProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
