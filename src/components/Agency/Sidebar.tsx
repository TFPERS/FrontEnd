import React from "react";
import ButtonSidebar from "../Agency/ButtonSidebar";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full h-full items-center py-10 px-7 bg-primary-light-orange">
      <div className="uppercase">Tfpers</div>
      <div className="flex flex-col w-full mt-10">
        <ButtonSidebar text="แดชบอร์ด" />
        <ButtonSidebar text="แจ้งเตือน" />
        <ButtonSidebar text="คำร้องขอ" />
      </div>
      <div className="mt-auto w-full">
        <ButtonSidebar text="ออกจากระบบ" />
      </div>
    </div>
  );
};

export default Sidebar;
