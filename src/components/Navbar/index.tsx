import Button from "../../components/Button";
import Image from "next/image";
import AuthService from "../../services/auth.service";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

type Props = {
  isLogin?: boolean;
};

export default function Navbar({ isLogin = true }: Props) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isProfile, setIsProfile] = useState(false);

  const toggleIsProfile = () => {
    setIsProfile(!isProfile);
  };

  const logOut = () => {
    AuthService.logout();
    router.push("/");
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setCurrentUser(AuthService.getCurrentUser());
    }
  }, []);
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
          <div>
            <span
              onClick={toggleIsProfile}
              style={{ fontSize: "3.125rem" }}
              className="material-icons-outlined cursor-pointer text-4xl relative"
            >
              account_circle
            </span>
            {isProfile && (
              <div className="bg-primary-white p-4 absolute right-16 rounded-[0.625rem]">
                <ul className="text-black space-y-4">
                  <li className="flex items-center cursor-pointer">
                    <span className="material-icons-outlined cursor-pointer text-4xl relative">
                      account_circle
                    </span>
                    <span>โปรไฟล์ของคุณ</span>
                  </li>
                  <li
                    onClick={logOut}
                    className="flex items-center cursor-pointer"
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
