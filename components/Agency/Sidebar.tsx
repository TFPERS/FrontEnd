import React, { useState } from "react";
import ButtonSidebar from "../Agency/ButtonSidebar";
import Image from "next/image";
import DashBoard from "../../../public/svg/Icon_Dashboard.svg";
import Document from "../../../public/svg/Icon_Document.svg";
import Exit from "../../../public/svg/Icon_Exit.svg";
import Notification from "../../../public/svg/Icon_Notification.svg";
import { useRouter } from "next/router";
import AuthAgencyService from "../../services/authAgency.service";

const Sidebar = () => {
  const router = useRouter();
  const [iconDashboard, setIconDashboard] = useState(false);
  const [iconDocument, setIconDocument] = useState(false);
  const [iconNotification, setIconNotification] = useState(false);
  const [iconExit, setIconExit] = useState(false);
  const logoutAgency = () => {
    AuthAgencyService.logout();
  };

  return (
    <div className="flex flex-col items-center w-full h-full py-10 px-7 bg-primary-light-orange">
      <div className="uppercase text-primary-white text-3xl font-semibold flex items-center space-x-4">
        <Image
          src="/images/TFPERSLOGO.png"
          alt=""
          width={45}
          height={45}
          className=""
        />
        <span>Tfpers</span>
      </div>
      <div className="flex flex-col w-full mt-10 space-y-6">
        <ButtonSidebar
          text="แดชบอร์ด"
          path="/agency/dashboard"
          mouseEnter={() => setIconDashboard(true)}
          mouseLeave={() => setIconDashboard(false)}
        >
          <DashBoard
            fill={
              router.pathname === "/agency/dashboard" || iconDashboard
                ? "#FA4616"
                : "white"
            }
          />
        </ButtonSidebar>
        <ButtonSidebar
          text="แจ้งเตือน"
          path="/agency/notification"
          mouseEnter={() => setIconNotification(true)}
          mouseLeave={() => setIconNotification(false)}
        >
          <Notification
            fill={
              router.pathname === "/agency/notification" || iconNotification
                ? "#FA4616"
                : "white"
            }
          />
        </ButtonSidebar>
        <ButtonSidebar
          text="คำร้องขอ"
          path="/agency/application"
          mouseEnter={() => setIconDocument(true)}
          mouseLeave={() => setIconDocument(false)}
        >
          <Document
            fill={
              router.pathname === "/agency/application" || iconDocument
                ? "#FA4616"
                : "white"
            }
          />
        </ButtonSidebar>
      </div>
      <div className="w-full mt-auto" onClick={logoutAgency}>
        <ButtonSidebar
          text="ออกจากระบบ"
          path="/agency"
          mouseEnter={() => setIconExit(true)}
          mouseLeave={() => setIconExit(false)}
        >
          <Exit fill={iconExit ? "#FA4616" : "white"} />
        </ButtonSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
