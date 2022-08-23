import React from "react";
import Sidebar from "../../components/Agency/Sidebar";
import Card from "../../components/Agency/Card";
import Image from "next/image";

const agency = () => {
  return (
    <div className="min-h-screen flex">
      <div className="bg-slate-700 min-w-[270px]">
        <Sidebar />
      </div>
      <div className="bg-white w-full">col2</div>
      <div className="bg-white min-w-[270px] py-8 pr-7 flex flex-col space-y-5 ">
        <Card>
          <div className="flex flex-col justify-center items-center h-full space-y-5">
            <Image
              src="/images/Mask_user_profile.png "
              alt="HappyStudent"
              width={150}
              height={150}
            />
            <div className="">กลุ่มงานช่วยเหลือทางการ เงินนักศึกษา</div>
          </div>
        </Card>
        <Card>
          <div>การแจ้งเตือน</div>
          <div className="overflow-auto h-5/6 space-y-4 " id="journal-scroll">
            <div className="rounded-[0.625rem] text-black flex h-24 w-full bg-white">
              <div className="w-1/6 self-center text-black bg-black m-2">
                <Image
                  src="/images/Mask_user_profile.png "
                  alt="HappyStudent"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-col overflow-auto w-5/6 text-left">
                <div>กลุ่มงานช่วยเหลือทางการเงินแก่นักศึกษา</div>
                <div>มีการอัพเดตนโยบายจากทางมหาวิทยาลัยภายในปี 20222</div>
              </div>
            </div>
            <div className="rounded-[0.625rem] text-black flex h-24 w-full bg-white">
              <div className="w-1/6 self-center text-black bg-black m-2">
                <Image
                  src="/images/Mask_user_profile.png "
                  alt="HappyStudent"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-col overflow-auto w-5/6 text-left">
                <div>กลุ่มงานช่วยเหลือทางการเงินแก่นักศึกษา</div>
                <div>มีการอัพเดตนโยบายจากทางมหาวิทยาลัยภายในปี 20222</div>
              </div>
            </div>
            <div className="rounded-[0.625rem] text-black flex h-24 w-full bg-white">
              <div className="w-1/6 self-center text-black bg-black m-2">
                <Image
                  src="/images/Mask_user_profile.png "
                  alt="HappyStudent"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-col overflow-auto w-5/6 text-left">
                <div>กลุ่มงานช่วยเหลือทางการเงินแก่นักศึกษา</div>
                <div>มีการอัพเดตนโยบายจากทางมหาวิทยาลัยภายในปี 20222</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default agency;
