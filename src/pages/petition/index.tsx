import Link from "next/link";
import Layout from "../../components/Layout/index";
import PetitionBox from "../../components/Petition/Box";
import Image from "next/image";
import { useHeadTitle } from "../../context/HeadContext";
import { WindowSize } from "../../helper/useBreakpoint";
import { useEffect } from "react";

export default function Petition() {
  const { setHeadTitle } = useHeadTitle();
  useEffect(() => {
    setHeadTitle("แจ้งคำร้อง");
  });
  const { isMobile, isTablet, isDesktop } = WindowSize();
  return (
    <Layout>
      <div
        className={`grid grid-cols-${
          isDesktop ? "2" : "1"
        } mt-20 gap-10 justify-items-center mx-auto max-w-7xl`}
      >
        {isDesktop && (
          <div className="col-span-1 justify-self-end">
            <Image
              src="/images/HandWriting.png "
              alt="HappyStudent"
              width={593}
              height={601}
            />
          </div>
        )}

        <div
          className={`col-span-1 flex flex-col self-center space-y-4
          ${isMobile ? "text-2xl" : "text-4xl"}
          `}
        >
          <PetitionBox
            image="/images/note.png"
            altImage="note"
            width={isMobile ? 140 : 140}
            height={isMobile ? 120 : 145}
            htmlText={
              <span className="font-semibold">
                แจ้งคำร้อง
                <br />
                ขยายเวลาชำระเงิน
              </span>
            }
            path="/petition/extendpayment"
          />
          <PetitionBox
            image="/images/folder.png"
            altImage="folder"
            width={isMobile ? 120 : 157}
            height={isMobile ? 140 : 151}
            htmlText={
              <span className="font-semibold">
                แจ้งคำร้อง <br />
                ผ่อนผันค่าเล่าเรียน
              </span>
            }
            path="/petition/waiverfees"
          />
          <PetitionBox
            image="/images/search.png"
            altImage="search"
            width={isMobile ? 250 : 240}
            height={isMobile ? 130 : 150}
            htmlText={
              <>
                <span className="font-semibold">ติดตามคำร้อง</span>
                <br />
                <span className={`${isMobile ? "text-xl" : "text-2xl"}`}>
                  ติดตามคำร้องและสถานะ{" "}
                </span>
              </>
            }
            path="/petition/follow"
          />
        </div>
      </div>{" "}
      {/* <Link href="/">
        <span className="material-icons-outlined cursor-pointer">
          arrow_back
        </span>
      </Link> */}
    </Layout>
  );
}
