import React from "react";
import ButtonSidebar from "../Agency/ButtonSidebar";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full h-full items-center py-10 px-7 bg-primary-light-orange">
      <div className="uppercase">Tfpers</div>
      <div className="flex flex-col w-full mt-10">
        <ButtonSidebar text="แดชบอร์ด" path="/agency/dashboard" />
        <ButtonSidebar text="แจ้งเตือน" path="/agency/notification" />
        <ButtonSidebar text="คำร้องขอ" path="/agency/application" />
      </div>
      <div className="mt-auto w-full">
        <ButtonSidebar text="ออกจากระบบ" path="/" />
      </div>
    </div>
  );
};

export default Sidebar;
