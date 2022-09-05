import Button from "../../components/Button";
import Image from "next/image";
import AuthService from "../../services/auth.service";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { WindowSize } from "../../helper/useBreakpoint";
import Notification from "../../services/notification.service";
import axios from "../../config/axios.config";

type Props = {
  isLogin?: boolean;
};

const useOutsideAlerter = (ref: any, handler: any) => {
  useEffect(() => {
    function handlerClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handlerClickOutside);
    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  }, [ref]);
};
const useNotiOutside = (ref: any, handler: any) => {
  useEffect(() => {
    function handlerClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handlerClickOutside);
    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  }, [ref]);
};

export default function Navbar({ isLogin = true }: Props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenNoti, setIsOpenNoti] = useState(false);
  const [isReadNoti, setIsReadNoti] = useState(false);

  let profileRef = useRef<any>();
  const toggleIsProfile = () => {
    setIsProfile(!isProfile);
  };

  const logOut = async () => {
    AuthService.logout();
    await router.push("/");
    setCurrentUser(AuthService.getCurrentUser());
  };

  const routeToProfile = () => {
    router.push("/profile");
  };
  const toggleIsNoti = async () => {
    setIsOpenNoti(!isOpenNoti);
    if (isOpenNoti) {
      axios.put(
        `/api/notification/update/status/${AuthService.getCurrentUser().id}`
      );
    }
    setIsReadNoti(true);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIsProfile(false);
    setIsOpenMenu(false);
  });
  const notiRef = useRef(null);
  useNotiOutside(notiRef, () => {
    setIsOpenNoti(false);
  });
  const { isMobile, isTablet, isDesktop } = WindowSize();

  useEffect(() => {
    if (!isMobile) {
      setIsOpenMenu(false);
    }
    const fetch = async () => {
      await setCurrentUser(AuthService.getCurrentUser());
    };
    fetch();
  }, []);
  const [stdNotifications, setStdNotifications] = useState<any>([]);
  useEffect(() => {
    const fetchNoti = async () => {
      const { data } = await Notification.getNotificationByStudentId(
        AuthService.getCurrentUser().id
      );
      setIsReadNoti(data.isRead);
      setStdNotifications(data.studentNotification);
    };
    AuthService.checkToken() ? fetchNoti() : "";
  }, []);

  return (
    <header
      className={`flex items-center justify-between max-w-[122.5rem] mx-auto bg-primary-light-orange
    ${isMobile ? "p-4" : "p-4"}
    `}
    >
      <div
        onClick={() => router.push("/petition")}
        className="flex items-center cursor-pointer"
      >
        <Image
          src="/images/TFPERSLOGO.png "
          alt="TFPERSLogo"
          width={isMobile ? 50 : 90}
          height={isMobile ? 50 : 90}
        />
        <h1 className="text-4xl sm:text-5xl text-white font-bold ml-5">
          TFPERS
        </h1>
      </div>
      {isMobile ? (
        <>
          <span
            onClick={() => setIsOpenMenu(true)}
            className="material-icons-outlined text-primary-white cursor-pointer"
            style={{ fontSize: "50px" }}
          >
            menu
          </span>
          <div
            ref={wrapperRef}
            className={`absolute top-0 transition-all ease-out h-48 left-0 right-0 duration-500 shadow-4xl
              ${
                isOpenMenu
                  ? `flex flex-col bg-primary-light-orange h-48 z-50 p-3 `
                  : `overflow-hidden h-0`
              }
            `}
          >
            <>
              <div className="absolute right-5">
                <span
                  onClick={() => setIsOpenMenu(false)}
                  className={`material-icons-outlined cursor-pointer text-white`}
                  style={{ fontSize: "40px" }}
                >
                  close
                </span>
              </div>
              {currentUser ? (
                <>
                  <div
                    className={` transition-all h-full w-full mt-7 flex flex-col text-center justify-center items-center space-y-2 text-2xl text-primary-white ${
                      isOpenMenu ? "opacity-100 duration-1000" : "opacity-0"
                    }`}
                  >
                    <div
                      onClick={routeToProfile}
                      className="border-b w-full cursor-pointer hover:bg-primary-coquelicot"
                    >
                      ข้อมูลส่วนตัวของคุณ
                    </div>
                    <div className="border-b w-full cursor-pointer hover:bg-primary-coquelicot">
                      แจ้งเตือน
                    </div>
                    <div
                      onClick={logOut}
                      className="border-b w-full cursor-pointer hover:bg-primary-coquelicot"
                    >
                      ออกจากระบบ
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`mt-14 transition-allh-full w-full flex flex-col text-center justify-center items-center space-y-2 text-2xl text-primary-white ${
                      isOpenMenu
                        ? "opacity-100 duration-1000"
                        : "opacity-0 duration-500"
                    }`}
                  >
                    <div
                      onClick={() => {
                        router.push("/login");
                      }}
                      className="border-b w-full cursor-pointer hover:bg-primary-coquelicot"
                    >
                      เข้าสู่ระบบ
                    </div>
                    <div
                      onClick={() => {
                        router.push("/register");
                      }}
                      className="border-b w-full cursor-pointer hover:bg-primary-coquelicot"
                    >
                      สมัคร
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        </>
      ) : (
        <>
          {currentUser ? (
            <div className="flex space-x-4 text-white font-normal">
              <div ref={notiRef} className="relative">
                <div className="relative cursor-pointer">
                  <span
                    style={{ fontSize: "3.125rem" }}
                    className="material-icons-outlined cursor-pointer"
                    onClick={toggleIsNoti}
                  >
                    notifications
                  </span>
                  {!isReadNoti ? (
                    <span
                      className="bg-yellow-300 w-5 h-5 rounded-full absolute bottom-2 right-0 cursor-pointer"
                      onClick={toggleIsNoti}
                    />
                  ) : (
                    ""
                  )}
                </div>
                {isOpenNoti && (
                  <div className="bg-primary-white border p-4 absolute z-40 right-4 rounded-[0.625rem] w-96 text-black max-h-[31.25rem] overflow-auto">
                    <ul className="space-y-2 text-black">
                      <li className="text-3xl font-bold">การแจ้งเตือน</li>
                      {
                        stdNotifications.map((noti: any) => {
                          return (
                            <li key={noti.id} className="border-b pb-2">
                              <div className="flex space-x-4">
                                <div>
                                  <Image
                                    src="/images/Profile.png"
                                    width={50}
                                    height={50}
                                    alt="profile"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold text-2xl break-words">
                                    {noti.notification.agency.name}
                                  </span>
                                  <span className="break-words">
                                    {noti.notification.description}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        })
                        // ) : (
                        //   <li>ไม่มีแจ้งเตือน</li>
                        // )
                      }
                    </ul>
                  </div>
                )}
              </div>
              <div ref={wrapperRef}>
                <span
                  onClick={toggleIsProfile}
                  style={{ fontSize: "3.125rem" }}
                  className="material-icons-outlined cursor-pointer text-4xl relative"
                >
                  account_circle
                </span>
                {isProfile && (
                  <div className="bg-primary-white p-4 absolute z-40 right-16 rounded-[0.625rem] border">
                    <ul className="text-black space-y-2 ">
                      <li
                        onClick={routeToProfile}
                        className="flex items-center cursor-pointer space-x-2 hover:bg-slate-200 p-1 rounded-[0.625rem]"
                      >
                        <span className="material-icons-outlined cursor-pointer text-4xl relative">
                          account_circle
                        </span>
                        <span>ข้อมูลส่วนตัวของคุณ</span>
                      </li>
                      <li
                        onClick={logOut}
                        className="z-50 flex items-center cursor-pointer space-x-2 hover:bg-slate-200 p-1 rounded-[0.625rem]"
                      >
                        <span className="material-icons-outlined">logout</span>
                        <span>ออกจากระบบ</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Button text="เข้าสู่ระบบ" color="bg-[#F24B1C]" path="/login" />
              <Button
                text="สมัคร"
                color="bg-primary-light-yellow"
                path="/register"
              />
            </div>
          )}
        </>
      )}
    </header>
  );
}
