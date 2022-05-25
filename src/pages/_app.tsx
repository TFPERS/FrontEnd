import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "material-icons/iconfont/material-icons.css";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { AuthContextProvider } from "../context/AuthContext";
import { HeadTitleContext } from "../context/HeadContext";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [headTitle, setHeadTitle] = useState("");
  useEffect(() => {
    const token = getCookie("TFPERSTOKEN");
    if (!token) {
      localStorage.removeItem("user");
    }
  });

  return (
    <HeadTitleContext.Provider value={{ headTitle, setHeadTitle }}>
      <AuthContextProvider>
        <Head>
          <title>TFPERS {headTitle && `- ${headTitle}`}</title>
          <link
            rel="icon"
            href="/images/TFPERSLOGO.png"
            type="image/icon type"
          ></link>
        </Head>
        <Component {...pageProps} />
      </AuthContextProvider>
    </HeadTitleContext.Provider>
  );
}
export default MyApp;
