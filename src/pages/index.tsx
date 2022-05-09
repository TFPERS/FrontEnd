import type { NextPage } from "next";
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout/index";

const Home: NextPage = () => {
  return (
    <Layout isMain isLogin={false}>
      <div className="absolute top-[33rem] left-[4.5rem]">
        <div className="flex flex-col space-y-10">
          <span className="text-[2.5rem] text-[#4A4A4A] font-bold">
            คำร้องขอค่าเล่าเรียน <br /> ทำได้ง่าย ในเวลาอันสั้น
          </span>
          <span className="text-4xl text-[#4A4A4A] font-medium">
            ส่งคำร้องค่าเล่าเรียนได้ <br /> ตามความต้องการของคุณ
          </span>
          <div className="flex cursor-pointer text-[2rem] w-[16.25rem] h-[3.75rem]">
            <Link href="/petition">
              <a className="flex items-center justify-center text-primary-white bg-primary-coquelicot w-[12.5rem] h-[3.75rem] rounded-l-[0.625rem]">
                เริ่มเลยที่นี่
              </a>
            </Link>
            <Link href="/petition">
              <a className="flex items-center justify-center text-[#444444] bg-primary-light-yellow w-[3.75rem] h-[3.75rem] rounded-r-[0.625rem]">
                &gt;
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-44">
        <Image
          src="/images/HappyStudent.png "
          alt="HappyStudent"
          width={593}
          height={601}
        />
      </div>
    </Layout>
  );
};

export default Home;
