import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { WalletProvider } from "../src/contextProvider/WalletProvider";
import { ThemeProvider } from "theme-ui";
import theme from "../src/utils/theme-ui";
import { client } from "../src/apollo/client";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
