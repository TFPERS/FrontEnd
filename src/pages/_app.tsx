import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "material-icons/iconfont/material-icons.css";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>TFPERS</title>
        <link
          rel="icon"
          href="/images/TFPERSLOGO.png"
          type="image/icon type"
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
