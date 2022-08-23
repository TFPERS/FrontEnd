import React from "react";
import Sidebar from "../../components/Agency/Sidebar";
import Card from "../../components/Agency/Card";
import Image from "next/image";

const agency = () => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-slate-700 min-w-[270px]">
        <Sidebar />
      </div>
      <div className="w-full bg-white">col2</div>
      <div className="bg-white min-w-[270px] py-8 pr-7 flex flex-col space-y-5 ">
        <Card>
          <div className="flex flex-col items-center justify-center h-full space-y-5">
            <Image
              src="/images/Mask_user_profile.png "
              alt="HappyStudent"
              width={150}
              height={150}
            />
            <div className="text-xl">กลุ่มงานช่วยเหลือทางการเงินนักศึกษา</div>
          </div>
        </Card>
        <Card>
          <div className="text-xl">การแจ้งเตือน</div>
          <div className="space-y-4 overflow-auto h-5/6 " id="journal-scroll">
            <div className="rounded-[0.625rem] text-black flex h-24 w-full bg-white">
              <div className="self-center w-1/6 m-2 text-black bg-black">
                <Image
                  src="/images/Mask_user_profile.png "
                  alt="HappyStudent"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-col w-5/6 overflow-auto text-left">
                <div className="font-semibold">
                  กลุ่มงานช่วยเหลือทางการเงินแก่นักศึกษา
                </div>
                <div className="text-sm ">
                  มีการอัพเดตนโยบายจากทางมหาวิทยาลัยภายในปี 20222
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default agency;
