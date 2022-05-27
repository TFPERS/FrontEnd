import Button from "../../components/Button";
import Image from "next/image";
import AuthService from "../../services/auth.service";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { WindowSize } from "../../helper/useBreakpoint";

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

export default function Navbar({ isLogin = true }: Props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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
  useEffect(() => {
    const fetch = async () => {
      await setCurrentUser(AuthService.getCurrentUser());
    };
    fetch();
  }, []);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIsProfile(false);
    setIsOpenMenu(false);
  });

  useEffect(() => {
    if (!isMobile) {
      setIsOpenMenu(false);
    }
  });

  const { isMobile, isTablet, isDesktop } = WindowSize();

  return (
    <header className="flex items-center justify-between max-w-[122.5rem] mx-auto">
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
              <div>
                <span
                  style={{ fontSize: "3.125rem" }}
                  className="material-icons-outlined cursor-pointer"
                >
                  notifications
                </span>
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
                  <div className="bg-primary-white p-4 absolute z-40 right-16 rounded-[0.625rem]">
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
