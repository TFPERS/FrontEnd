import Navbar from "../Navbar/index";
import Head from "next/head";
import React, { ReactNode } from "react";
import { WindowSize } from "../../helper/useBreakpoint";

type Props = {
  children: ReactNode;
  isMain?: boolean;
  isLogin?: boolean;
};

const Layout = ({ children, isMain, isLogin }: Props) => {
  const { isDesktop } = WindowSize();
  return (
    <>
      <div
        className={`min-h-screen flex flex-col ${
          isDesktop ? "p-10" : "p-5"
        } bg-primary-light-orange  ${
          isMain ? "bg-hero-pattern h-full bg-cover min-h-screen" : ""
        }`}
      >
        <Navbar isLogin={isLogin} />
        <>{children}</>
      </div>
    </>
  );
};

export default Layout;
