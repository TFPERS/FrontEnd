import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Paginate from "../../components/Paginate";
import axios from "../../config/axios.config";
import Petition from "../../services/petition.service";
import { StatusPetition } from "../../enum/StatusPetition";
type Props = {
  petitions: any;
  isShowModal: boolean;
  submit?: any;
};

const useOutsideAlerter = (ref: any, handler: any) => {
  useEffect(() => {
    function handlerClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handlerClickOutside);
    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  }, [ref]);
};

const Table = ({ petitions, isShowModal = false, submit }: Props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIsOpenModal(false);
  });

  const formatStatus = (status: any) => {
    if (status === StatusPetition.Pending) {
      return (
        <div className="bg-[#C4C4C4] text-primary-white w-[7.5rem] h-[1.875rem] rounded-[0.625rem] flex items-center justify-center">
          รอดำเนินการ
        </div>
      );
    }
    if (status === StatusPetition.InProgress) {
      return (
        <div className="bg-[#FFC72C] text-primary-white w-[7.5rem] h-[1.875rem] rounded-[0.625rem] flex items-center justify-center">
          กำลังดำเนินการ
        </div>
      );
    }
    if (status === StatusPetition.Reject) {
      return (
        <div className="bg-[#FA2816] text-primary-white w-[7.5rem] h-[1.875rem] rounded-[0.625rem] flex items-center justify-center">
          ปฏิเสธ
        </div>
      );
    }
    if (status === StatusPetition.Done) {
      return (
        <div className="bg-[#17A87B] text-primary-white w-[7.5rem] h-[1.875rem] rounded-[0.625rem] flex items-center justify-center">
          เสร็จสิ้น
        </div>
      );
    }
  };
  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };
  const formatTypePetition = (type: any) => {
    if (type === "extendPayment") {
      return "ขยายเวลาชำระเงิน";
    }
  };
  const [selectedPetition, setSelectedPetition] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isShowSelectedStatus, setIsShowSelectedStatus] = useState(false);
  return (
    <div className="h-full relative border rounded-[0.625rem]">
      <table className={`table-fixed w-full text-center overflow-auto `}>
        <thead className="bg-primary-light-orange text-white text-2xl">
          <tr>
            <th className="py-9 rounded-tl-[0.625rem]">หมายเลขคำร้อง</th>
            <th>รหัสนักศึกษา</th>
            <th>สถานะคำร้อง</th>
            <th className="py-9 rounded-tr-[0.625rem]">วันที่</th>
          </tr>
        </thead>
        <tbody>
          {petitions.map((petition: any) => (
            <tr
              key={petition.id}
              className="cursor-pointer hover:bg-primary-light-yellow"
              onClick={() => {
                setIsOpenModal(true);
                setSelectedPetition(petition);
                setSelectedStatus(petition.status);
              }}
            >
              <td className="py-7">{petition.id}</td>
              <td className="overflow-auto">
                {petition.student ? petition.student.id : ""}
              </td>
              <td>
                <div className="flex justify-center">
                  {formatStatus(petition.status)}
                </div>
              </td>
              <td>{formatDD(petition.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {petitions.length === 0 ? (
        <div className="text-center h-4/6 my-auto text-3xl py-60">
          ไม่มีคำร้อง
        </div>
      ) : (
        ""
      )}
      {isShowModal && selectedPetition && isOpenModal && (
        <div
          ref={wrapperRef}
          className="absolute z-20 bg-primary-white h-[50rem] w-96 top-[-50px] right-0 border-4 border-black rounded-[0.625rem]"
        >
          <div className="flex flex-col p-10 space-y-5">
            <div>
              <span>หมายเลขคำร้อง</span>
              <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
                {selectedPetition.id}
              </div>
            </div>
            <div>
              <span>ประเภทคำร้อง</span>
              <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
                {formatTypePetition(selectedPetition.type)}
              </div>
            </div>
            <div>
              <span>รหัสนักศึกษา</span>
              <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
                {selectedPetition.student.id}
              </div>
            </div>
            <div>
              <span>สถานะคำร้อง</span>
              <div
                className="relative border p-2 rounded-[0.625rem] hover:bg-slate-100 cursor-pointer"
                onClick={() => setIsShowSelectedStatus(!isShowSelectedStatus)}
              >
                <div className="absolute right-4 top-4">
                  <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                {formatStatus(selectedStatus)}
                {isShowSelectedStatus && (
                  <div className="absolute w-full top-12 left-0 bg-white z-50 border rounded-[0.625rem] cursor-pointer">
                    <div
                      onClick={() => setSelectedStatus(StatusPetition.Reject)}
                      className="hover:bg-slate-100 p-2"
                    >
                      {formatStatus(StatusPetition.Reject)}
                    </div>
                    <div
                      onClick={() => setSelectedStatus(StatusPetition.Pending)}
                      className="hover:bg-slate-100 p-2"
                    >
                      {formatStatus(StatusPetition.Pending)}
                    </div>
                    <div
                      onClick={() =>
                        setSelectedStatus(StatusPetition.InProgress)
                      }
                      className="hover:bg-slate-100 p-2"
                    >
                      {formatStatus(StatusPetition.InProgress)}
                    </div>
                    <div
                      onClick={() => setSelectedStatus(StatusPetition.Done)}
                      className="hover:bg-slate-100 p-2"
                    >
                      {formatStatus(StatusPetition.Done)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <span>วันที่</span>
              <div className="border p-2 rounded-[0.625rem] bg-gray-200 cursor-not-allowed">
                {formatDD(selectedPetition.createdAt)}
              </div>
            </div>
            <div>
              <span>หมายเหตุ</span>
              <div className="border p-2 rounded-[0.625rem] break-words h-[8rem] overflow-auto bg-gray-200 cursor-not-allowed">
                {selectedPetition.description}
              </div>
            </div>
            <div>
              <span>ไฟล์เอกสาร</span>
              <div className="border p-2 rounded-[0.625rem] h-[3rem] overflow-auto bg-gray-200 cursor-not-allowed">
                {selectedPetition.file ? selectedPetition.file : "ไม่มีเอกสาร"}
              </div>
            </div>
            <div className="flex justify-between">
              <div
                onClick={() => submit(selectedPetition.id, selectedStatus)}
                className="bg-[#17A87B] cursor-pointer text-primary-white w-[7.5rem] h-[1.875rem] rounded-[0.625rem] flex items-center justify-center"
              >
                ยืนยัน
              </div>
              <div
                onClick={() => setIsOpenModal(false)}
                className="bg-[#FA2816] cursor-pointer text-primary-white w-[7.5rem] h-[1.875rem] rounded-[0.625rem] flex items-center justify-center"
              >
                ยกเลิก
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
