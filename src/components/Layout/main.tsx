import Navbar from "../Navbar/index";
import React, { FC, ReactNode, useReducer } from "react";

type Props = {
  children: ReactNode;
  isMain?: boolean;
};

const Layout = ({ children, isMain = false }: Props) => {
  return (
    <>
      <div
        className={`min-h-screen flex flex-col p-10 ${
          isMain ? "bg-hero-pattern" : ""
        }`}
      >
        <Navbar />
        <>{children}</>
      </div>
    </>
  );
};

export default Layout;
