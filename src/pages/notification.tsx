import React, { useEffect, useReducer, useState } from "react";
import Layout from "../components/Layout";
import Notification from "../services/notification.service";
import AuthService from "../services/auth.service";
import Image from "next/image";
import { WindowSize } from "../helper/useBreakpoint";
import { useRouter } from "next/router";
import dayjs from "dayjs";
// import socket from "../config/socketIo.config";

const notification = () => {
  const [stdNotifications, setStdNotification] = useState<any>([]);
  const { isMobile, isTablet, isDesktop } = WindowSize();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const router = useRouter();
  useEffect(() => {
    const fetchNoti = async () => {
      const { data } = await Notification.getNotificationByStudentId(
        AuthService.getCurrentUser().id
      );
      setStdNotification(data.studentNotification);
    };
    AuthService.checkToken() ? fetchNoti() : "";
  }, [reducerValue]);

  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };

  return (
    <Layout>
      <div className=" mt-4 pb-2 max-w-5xl mx-auto">
        <div className="bg-white min-h-[48rem] max-h-[48rem] p-4 rounded-[0.625rem] overflow-auto">
          <div className="text-3xl font-bold">การแจ้งเตือน</div>
          <div className="">
            {
              stdNotifications.map((noti: any) => {
                console.log(noti.notification);
                return (
                  <div
                    key={noti.notification.id}
                    className="mt-3 pb-2 border-b max-h-[6rem] overflow-auto"
                  >
                    <div className="flex space-x-4">
                      <div className="pt-1">
                        <Image
                          src="/images/Profile.png"
                          width={50}
                          height={50}
                          alt="profile"
                        />
                      </div>
                      <div className="flex flex-col w-full overflow-auto">
                        <span className="font-bold text-2xl break-words">
                          {noti.notification.agency.name}
                        </span>
                        <span className="break-words">
                          {noti.notification.description}
                        </span>
                        <span>{formatDD(noti.notification.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
              // ) : (
              //   <li>ไม่มีแจ้งเตือน</li>
              // )
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default notification;
