import React, { useReducer } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import FileService from "../../services/file.service";
import { StatusPetition } from "../../enum/StatusPetition";
import PetitionService from "../../services/petition.service";
import Swal from "sweetalert2";
import { WindowSize } from "../../helper/useBreakpoint";
type Props = {
  petition: any;
  closeModal: any;
};

const Modal = ({ petition, closeModal }: Props) => {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };

  const downloadFilePdf = (filename: any) => {
    FileService.getFilePdf(filename);
  };
  const cancelPetition = () => {
    const cancel = StatusPetition.Cancel;
    const note = StatusPetition.Cancel;
    Swal.fire({
      title: "คุณต้องยกเลิกคำขอหรือไม่",
      text: "ถ้ายกเลิกคำขอแล้ว คำขอนี้จะไม่สามารถดำเนินการต่อ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30d64c",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        PetitionService.update(petition.id, cancel, note);
        Swal.fire("ยกเลิกคำขอแล้ว", "คำขอนี้ถูกยกเลิกแล้ว", "success");
        forceUpdate();
      }
    });
  };

  const { isMobile, isTablet, isDesktop } = WindowSize();
  return (
    <div className="relative">
      <div className="flex flex-col space-y-5 p-10 ">
        <div>
          <span className="font-bold text-xl">หมายเลขคำร้อง</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {petition.id}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">ประเภทคำร้อง</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {petition.type}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">รหัสนักศึกษา</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {petition.student.id}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">ปีการศึกษา</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {petition.term}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">สถานะคำร้อง</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {petition.status}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">วันที่</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {formatDD(petition.createdAt)}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">รายละเอียด</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed h-[5rem]  overflow-auto break-words">
            {petition.description}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">ไฟล์เอกสาร</span>
          <div
            className={`border p-2 rounded-[0.625rem] overflow-auto
        ${
          petition.files.length !== 0
            ? "h-[4rem]"
            : "border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed"
        }`}
          >
            {petition.files.length !== 0
              ? petition.files.map((file: any) => (
                  <div
                    key={file.id}
                    onClick={() => {
                      downloadFilePdf(file.name);
                    }}
                  >
                    <div className="cursor-pointer h-6 w-6">
                      <Image
                        src="/images/pdf.png"
                        alt=""
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="cursor-pointer">{file.originalName}</div>
                  </div>
                ))
              : "-"}
          </div>
        </div>
        <div>
          <span className="font-bold text-xl">หมายเหตุ</span>
          <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
            {petition.note ? petition.note : "-"}
          </div>
        </div>
        <div className="flex justify-between">
          {/* <button
            // onClick={cancelPetition}
            className={`${
              isMobile ? "text-sm" : ""
            } text-white bg-primary-light-yellow shadow-3xl font-bold p-1 mt-5 rounded-[0.625rem] w-24`}
          >
            แก้ไข
          </button> */}

          {petition.status === StatusPetition.Pending ? (
            <button
              onClick={cancelPetition}
              className={`${
                isMobile ? "text-sm" : ""
              } text-white bg-red-500 shadow-3xl font-bold p-1 mt-5 rounded-[0.625rem] w-24`}
            >
              ยกเลิกคำขอ
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={closeModal}
      >
        X
      </div>
    </div>
  );
};

export default Modal;
