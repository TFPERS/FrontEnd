import React, { useReducer, useRef } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/index";
import { useState, useEffect } from "react";
import axios from "../../../config/axios.config";
import AuthService from "../../../services/auth.service";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useHeadTitle } from "../../../context/HeadContext";
import { WindowSize } from "../../../helper/useBreakpoint";
import Paginate from "../../../components/Paginate/index";
import { StatusPetition } from "../../../enum/StatusPetition";
import Petition from "../../../services/petition.service";
import Modal from "../../../components/Student/Modal";
import Swal from "sweetalert2";
import PetitionService from "../../../services/petition.service";

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

function Follow() {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setIsOpenModal(false);
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setHeadTitle } = useHeadTitle();
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [size, setSize] = useState(5);
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value !== currentPage) {
      setcurrentPage(value);
      const page = value - 1;
      const { data } = await Petition.getPetitionByStudentId(
        AuthService.getCurrentUser().id,
        page,
        size,
        searchWord
      );
      setPetitions(data.content);
    }
  };

  const [petitions, setPetitions] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    setHeadTitle("ติดตามคำร้องและสถานะ");
    const fetchPetition = async () => {
      const page = currentPage - 1;
      const { data } = await Petition.getPetitionByStudentId(
        AuthService.getCurrentUser().id,
        page,
        size,
        searchWord
      );
      setPetitions(data.content);
      setTotalPage(data.totalPages);
      setcurrentPage(1);
    };
    AuthService.checkToken() ? fetchPetition() : router.push("/login");
  }, [reducerValue]);

  const changeInput = async (event: any) => {
    await setSearchWord(event.target.value);
    forceUpdate();
  };

  const cancelPetition = (petitionId: any) => {
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
        PetitionService.update(petitionId, cancel, note);
        Swal.fire("ยกเลิกคำขอแล้ว", "คำขอนี้ถูกยกเลิกแล้ว", "success");
        forceUpdate();
      }
    });
  };

  const formatStatus = (status: any) => {
    if (status === StatusPetition.Pending) {
      return (
        <div
          className={`bg-[#C4C4C4] text-primary-white rounded-[0.625rem] flex items-center justify-center
        ${isMobile ? "w-[8.125rem] h-[1.875rem]" : "w-[11.25rem] h-[3.75rem]"}
        `}
        >
          รอดำเนินการ
        </div>
      );
    }
    if (status === StatusPetition.InProgress) {
      return (
        <div
          className={`bg-[#FFC72C] text-primary-white rounded-[0.625rem] flex items-center justify-center 
        ${isMobile ? "w-[8.125rem] h-[1.875rem]" : "w-[11.25rem] h-[3.75rem]"}
       `}
        >
          กำลังดำเนินการ
        </div>
      );
    }
    if (status === StatusPetition.Reject) {
      return (
        <div
          className={`bg-[#FA2816] text-primary-white rounded-[0.625rem] flex items-center justify-center
          ${isMobile ? "w-[8.125rem] h-[1.875rem]" : "w-[11.25rem] h-[3.75rem]"}
          `}
        >
          ปฏิเสธ
        </div>
      );
    }
    if (status === StatusPetition.Done) {
      return (
        <div
          className={`bg-[#17A87B] text-primary-white rounded-[0.625rem] flex items-center justify-center
          ${isMobile ? "w-[8.125rem] h-[1.875rem]" : "w-[11.25rem] h-[3.75rem]"}
          `}
        >
          เสร็จสิ้น
        </div>
      );
    }
    if (status === StatusPetition.Cancel) {
      return (
        <div
          className={`bg-[#FA2816] text-primary-white rounded-[0.625rem] flex items-center justify-center
        ${isMobile ? "w-[8.125rem] h-[1.875rem]" : "w-[11.25rem] h-[3.75rem]"}
        `}
        >
          {StatusPetition.Cancel}
        </div>
      );
    }
  };
  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };

  const { isMobile, isTablet, isDesktop } = WindowSize();
  const [selectedPetition, setSelectedPetition] = useState<any>(null);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Layout>
      <div className="bg-primary-white rounded-[0.625rem] min-h-[67vh] shadow-4xl h-full flex flex-col max-w-7xl mx-auto mt-10 relative">
        <div className="flex justify-between items-center">
          <div
            className={`${
              isMobile ? "text-sm p-4 text-center" : "text-4xl p-8"
            } font-semibold `}
          >
            ติดตามคำร้องและสถานะ
          </div>
          <div className="flex items-center w-[18.75rem] mr-2">
            <input
              onChange={(e) => changeInput(e)}
              placeholder="ค้นหา"
              className="border p-1 px-3 w-full rounded-[0.625rem] focus:outline-none focus:border-primary-light-orange focus:border-2"
            />
          </div>
        </div>
        <table
          className={`table-fixed w-full text-center overflow-auto ${
            isMobile ? "text-sm" : "text-2xl"
          }`}
        >
          <thead className="border-y-4">
            <tr>
              <th className={`${isMobile ? "p-1" : "p-3"}`}>หมายเลขคำร้อง</th>
              <th>ประเภทคำร้อง</th>
              <th>สถานะคำร้อง</th>
              <th>เทอม</th>
            </tr>
          </thead>
          <tbody className={`${isMobile ? "" : "text-2xl"} `}>
            {petitions.map((petition: any) => (
              <tr
                key={petition.id}
                onClick={() => {
                  setIsOpenModal(true);
                  setSelectedPetition(petition);
                }}
                className="cursor-pointer hover:bg-slate-100"
              >
                <td className="py-7">{petition.id}</td>
                <td className="overflow-auto">{petition.type}</td>
                <td>
                  <div className="flex justify-center">
                    {formatStatus(petition.status)}
                  </div>
                </td>
                <td>{petition.term}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {petitions.length === 0 ? (
          <div className="text-center h-4/6 my-auto text-3xl">ไม่มีคำร้อง</div>
        ) : (
          ""
        )}
        {isOpenModal && selectedPetition && (
          <div
            ref={wrapperRef}
            className={`${
              isMobile ? "" : "w-2/4"
            } absolute z-20 bg-primary-white h-full top-0 right-0 border-4 border-black rounded-[0.625rem] overflow-auto`}
          >
            <Modal
              cancelPetition={cancelPetition}
              petition={selectedPetition}
              closeModal={closeModal}
            />
          </div>
        )}
      </div>
      {totalPage === 1 || totalPage === 0 ? (
        ""
      ) : (
        <div className="mt-3 max-w-lg bg-white shadow-4xl mx-auto p-2 rounded-2xl">
          <Paginate
            totalPage={totalPage}
            currentPage={currentPage}
            handleChange={handleChange}
          />
        </div>
      )}
    </Layout>
  );
}

export default Follow;
