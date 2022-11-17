import "../styles/globals.css";
import "../styles/noti.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "material-icons/iconfont/material-icons.css";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { HeadTitleContext } from "../context/HeadContext";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [headTitle, setHeadTitle] = useState("");
  useEffect(() => {
    const token = getCookie("TFPERSTOKEN");
    if (!token) {
      localStorage.removeItem("user");
    }
    const tokenAgency = getCookie("TFPERSAGENCYTOKEN");
    if (!tokenAgency) {
      localStorage.removeItem("agency");
    }
  });

  return (
    <HeadTitleContext.Provider value={{ headTitle, setHeadTitle }}>
      <Head>
        <title>TFPERS {headTitle && `- ${headTitle}`}</title>
        <link
          rel="icon"
          href="/images/TFPERSLOGO.png"
          type="image/icon type"
        ></link>
      </Head>
      <Component {...pageProps} />
    </HeadTitleContext.Provider>
  );
}
export default MyApp;
