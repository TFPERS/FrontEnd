import Link from "next/link";
import Layout from "../../components/Layout/index";
import PetitionBox from "../../components/Petition/Box";
import Image from "next/image";
import { useHeadTitle } from "../../context/HeadContext";
import { WindowSize } from "../../helper/useBreakpoint";

export default function Petition() {
  const { setHeadTitle } = useHeadTitle();
  setHeadTitle("แจ้งคำร้อง");
  const { isMobile, isTablet, isDesktop } = WindowSize();
  return (
    <Layout>
      <div
        className={`grid grid-cols-${
          isDesktop ? "2" : "1"
        } mt-20 gap-10 justify-items-center mx-auto`}
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

        <div className={`col-span-1 flex flex-col self-center space-y-4`}>
          <PetitionBox
            image="/images/note.png"
            altImage="note"
            width={141}
            height={145}
            htmlText={
              <span className="text-4xl font-semibold">
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
            width={157}
            height={151}
            htmlText={
              <span className="text-4xl font-semibold">
                แจ้งคำร้อง <br />
                ผ่อนผันค่าเล่าเรียน
              </span>
            }
          />
          <PetitionBox
            image="/images/search.png"
            altImage="search"
            width={315.79}
            height={150}
            htmlText={
              <>
                <span className="text-4xl font-semibold">ติดตามคำร้อง</span>
                <br />
                <span className="text-2xl">ติดตามคำร้องและสถานะ </span>
              </>
            }
            path="/petition/follow"
          />
        </div>
        <Link href="/">
          <a>back</a>
        </Link>
      </div>
    </Layout>
  );
}
