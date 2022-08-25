import React from "react";
import ButtonSidebar from "../Agency/ButtonSidebar";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center w-full h-full py-10 px-7 bg-primary-light-orange">
      <div className="uppercase text-primary-white text-3xl font-semibold">
        <Image
          src="/images/TFPERSLOGO.png"
          alt=""
          width={45}
          height={45}
          className=""
        />
        Tfpers
      </div>
      <div className="flex flex-col w-full mt-10 space-y-6">
        <ButtonSidebar
          text="แดชบอร์ด"
          path="/agency/dashboard"
          img="/svg/Icon_Dashboard.svg"
        />
        <ButtonSidebar
          text="แจ้งเตือน"
          path="/agency/notification"
          img="/svg/Icon_Notification.svg"
        />
        <ButtonSidebar
          text="คำร้องขอ"
          path="/agency/application"
          img="/svg/Icon_Document.svg"
        />
      </div>
      <div className="w-full mt-auto">
        <ButtonSidebar text="ออกจากระบบ" path="/" img="/svg/Icon_Exit.svg" />
      </div>
    </div>
  );
};

export default Sidebar;
