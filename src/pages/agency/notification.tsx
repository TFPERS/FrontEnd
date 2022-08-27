import React from "react";
import Agency from "../../components/Layout/Agency";

const notice = () => {
  return (
    <Agency>
      <div className="flex flex-col space-y-5 h-full">
        <div className="text-3xl">แจ้งเตือน</div>
        <div className="flex flex-col bg-primary-light-orange h-5/6 p-10 space-y-4 rounded-lg">
          <div className="text-white">รายละเอียดการแจ้งเตือน</div>
          <textarea placeholder="" className="w-full h-full rounded-lg" />
          <div className="flex space-x-2 self-end">
            <button className="shadow-3xl bg-secondary-green p-2 text-white rounded-[0.625rem] w-[8.125rem] text-center">
              ยืนยัน
            </button>
            <button className="shadow-3xl bg-secondary-red p-2 text-white rounded-[0.625rem] w-[8.125rem] text-center">
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </Agency>
  );
};

export default notice;
