import type { NextPage } from "next";
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout/index";
import { useHeadTitle } from "../context/HeadContext";
import { WindowSize } from "../helper/useBreakpoint";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { isMobile } = WindowSize();

  return (
    <Layout isMain isLogin={false}>
      <div
        className={`
      ${isMobile ? "" : "top-[33rem] left-[4.5rem] absolute "}
     `}
      >
        {isMobile ? (
          <Image
            src="/images/HappyStudent.png "
            alt="HappyStudent"
            width={400}
            height={400}
          />
        ) : (
          ""
        )}
        <div className="flex flex-col space-y-10">
          <span
            className={`
          ${isMobile ? "text-3xl" : " text-[2.5rem]"}
          text-[#4A4A4A] font-bold`}
          >
            {isMobile && <div className="pb-2">TFPERS</div>}
            คำร้องขอค่าเล่าเรียน <br /> ทำได้ง่าย ในเวลาอันสั้น
          </span>
          <span
            className={`
          ${isMobile ? "text-2xl" : "text-3xl"}
        text-[#4A4A4A] font-medium
          `}
          >
            ส่งคำร้องค่าเล่าเรียนได้ <br /> ตามความต้องการของคุณ
          </span>
          <div
            className={`flex cursor-pointer font-semibold w-[16.25rem] h-[3.75rem]
          ${isMobile ? "text-2xl" : "text-[2rem]"}
          `}
          >
            <Link href="/petition">
              <a
                className={`flex items-center justify-center text-primary-white bg-primary-coquelicot  
              ${
                isMobile
                  ? "rounded-[0.625rem] w-[11.25rem] h-[2.8125rem]"
                  : "rounded-l-[0.625rem] w-[12.5rem] h-[3.75rem]"
              }
              `}
              >
                เริ่มเลยที่นี่
              </a>
            </Link>
            {!isMobile && (
              <Link href="/petition">
                <a className="flex items-center justify-center text-[#444444] bg-primary-light-yellow w-[3.75rem] h-[3.75rem] rounded-r-[0.625rem]">
                  &gt;
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="absolute right-0 top-44">
          <Image
            src="/images/HappyStudent.png "
            alt="HappyStudent"
            width={593}
            height={601}
          />
        </div>
      )}
    </Layout>
  );
};

export default Home;
