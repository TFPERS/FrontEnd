import Navbar from "../Navbar/index";
import Head from "next/head";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isMain?: boolean;
  isLogin?: boolean;
};

const Layout = ({ children, isMain, isLogin }: Props) => {
  return (
    <>
      <div
        className={`min-h-screen flex flex-col p-10 bg-primary ${
          isMain ? "bg-hero-pattern" : ""
        }`}
      >
        <Navbar isLogin={isLogin} />
        <>{children}</>
      </div>
    </>
  );
};

export default Layout;
