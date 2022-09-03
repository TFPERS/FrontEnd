import Navbar from "../Navbar/index";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import { WindowSize } from "../../helper/useBreakpoint";
import Notification from "../../../public/svg/Icon_Notification.svg";
import User from "../../../public/svg/Icon_User.svg";
import Document from "../../../public/svg/Icon_Document.svg";
import Home from "../../../public/svg/Icon_Home.svg";
import HomeColor from "../../../public/svg/HomeColor.svg";
import DocumentColor from "../../../public/svg/DocumentColor.svg";
import UserColor from "../../../public/svg/UserColor.svg";
import NotificationColor from "../../../public/svg/NotificationColor.svg";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  children: ReactNode;
  isMain?: boolean;
  isLogin?: boolean;
};

const Layout = ({ children, isMain, isLogin }: Props) => {
  const router = useRouter();
  const [iconHome, setIconHome] = useState(false);
  const [iconDocument, setIconDocument] = useState(false);
  const [iconNotification, setIconNotification] = useState(false);
  const [iconUser, setIconUser] = useState(false);
  const { isDesktop, isMobile } = WindowSize();
  return (
    <>
      <div
        className={`min-h-screen ${
          isDesktop ? "" : ""
        } bg-primary-light-orange  ${
          isMain && !isMobile
            ? "bg-hero-pattern h-full bg-cover min-h-screen"
            : isMain
            ? "bg-white h-full"
            : ""
        }`}
      >
        <Navbar isLogin={isLogin} />
        <div className={`${isMobile ? "p-5" : "px-7"}`}>{children}</div>
        {isMobile && (
          <div className="fixed bottom-0 w-full inset-x-0 bg-primary-light-orange shadow-2xl">
            <div className="flex justify-between border-t">
              <Link href="/">
                <div
                  className={`flex justify-center py-2 w-full focus:text-teal-500 hover:bg-primary-coquelicot cursor-pointer
                  ${router.pathname === "/" ? "bg-primary-coquelicot" : ""}`}
                >
                  {router.pathname === "/" ? (
                    <HomeColor />
                  ) : (
                    <Home
                      fill={
                        router.pathname === "/" || iconHome ? "white" : "white"
                      }
                    />
                  )}
                </div>
              </Link>
              <Link href="/notification">
                <div
                  className={`flex justify-center py-2 w-full focus:text-teal-500 hover:bg-primary-coquelicot cursor-pointer
                ${
                  router.pathname === "/notification"
                    ? "bg-primary-coquelicot"
                    : ""
                }`}
                >
                  {router.pathname === "/notification" ? (
                    <NotificationColor />
                  ) : (
                    <Notification
                      fill={
                        router.pathname === "/notification" || iconNotification
                          ? "white"
                          : "white"
                      }
                    />
                  )}
                </div>
              </Link>
              <Link href="/petition">
                <div
                  className={`flex justify-center py-2 w-full focus:text-teal-500 hover:bg-primary-coquelicot cursor-pointer
               ${
                 router.pathname === "/petition" ? "bg-primary-coquelicot" : ""
               }`}
                >
                  {router.pathname === "petition" ? (
                    <DocumentColor />
                  ) : (
                    <Document
                      fill={
                        router.pathname === "/petition" || iconDocument
                          ? "white"
                          : "white"
                      }
                    />
                  )}
                </div>
              </Link>
              <Link href="/profile">
                <div
                  className={`flex justify-center py-2 w-full focus:text-teal-500 hover:bg-primary-coquelicot cursor-pointer text
               ${
                 router.pathname === "/profile" ? "bg-primary-coquelicot" : ""
               }`}
                >
                  {router.pathname === "/profile" ? (
                    <UserColor />
                  ) : (
                    <User
                      fill={
                        router.pathname === "/profile" || iconUser
                          ? "white"
                          : "white"
                      }
                    />
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
