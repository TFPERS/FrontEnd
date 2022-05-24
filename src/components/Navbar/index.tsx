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
  });

  const { isMobile, isTablet, isDesktop } = WindowSize();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <Image
          src="/images/TFPERSLOGO.png "
          alt="TFPERSLogo"
          width={90}
          height={90}
        />
        <h1 className="text-5xl text-white font-bold ml-5">TFPERS</h1>
      </div>
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
                    <span>โปรไฟล์ของคุณ</span>
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
    </header>
  );
}
