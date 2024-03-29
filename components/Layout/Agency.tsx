import React, { ReactNode, useEffect, useReducer, useState } from "react";
import Card from "../Agency/Card";
import Sidebar from "../Agency/Sidebar";
import Image from "next/image";
import Notification from "../../services/notification.service";
// import socket from "../../config/socketIo.config";
import AuthAgencyService from "../../services/authAgency.service";
import dayjs from "dayjs";
type Props = {
  children: ReactNode;
};

const Agency = ({ children }: Props) => {
  const [notis, setNotis] = useState<any>([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [AgencyName, setAgencyName] = useState();
  useEffect(() => {
    const fetchNoti = async () => {
      const { data } = await Notification.getNotificationOfAgency();
      setNotis(data);
    };
    setAgencyName(AuthAgencyService.getCurrentUser().name);
    fetchNoti();
  }, [reducerValue]);

  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };

  return (
    <div className="flex min-h-screen ">
      <div className="bg-slate-700 min-w-[16.875rem]">
        <Sidebar />
      </div>
      <div className="w-full p-10 bg-white min-w-[48.75rem]">{children}</div>
      <div className="bg-white max-w-[16.875rem] min-w-[16.875rem] py-8 pr-7 flex flex-col space-y-5 ">
        <Card>
          <div className="flex flex-col items-center justify-center h-full space-y-5">
            <Image
              src="/images/Mask_user_profile.png "
              alt="HappyStudent"
              width={150}
              height={150}
            />
            <div className="text-xl">{AgencyName}</div>
          </div>
        </Card>
        <Card>
          <div className="text-xl">การแจ้งเตือน</div>
          <div className="space-y-4 overflow-auto h-[21.875rem]">
            {notis.map((noti: any) => {
              return (
                <div
                  className="rounded-[0.625rem] text-black flex max-h-[6rem] w-full bg-white"
                  key={noti.id}
                >
                  <div className="w-2/12 p-2 text-black">
                    <Image
                      src="/images/Profile.png "
                      alt="HappyStudent"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="flex flex-col w-10/12 overflow-auto text-left pr-2">
                    <div className="font-semibold break-words">
                      {noti.agency.name}
                    </div>
                    <div className="text-sm break-words">
                      {noti.description}
                    </div>
                    <div className="text-sm break-words">
                      {formatDD(noti.updatedAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Agency;
