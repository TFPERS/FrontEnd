import React, { useEffect, useReducer, useState } from "react";
import Agency from "../../components/Layout/Agency";
import Table from "../../components/Agency/Table";
import axios from "../../config/axios.config";
import Paginate from "../../components/Paginate";
import AuthAgencyService from "../../services/authAgency.service";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Petition from "../../services/petition.service";

const application = () => {
  const [petitions, setPetitions] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const router = useRouter();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [searchWord, setSearchWord] = useState("");

  const submit = async (petitionId: any, status: any) => {
    try {
      await Petition.updateStatus(petitionId, status);
      Swal.fire({
        background: "#FA4616",
        color: "#fff",
        title: "อัพเดตสถานะเรียบร้อย",
        icon: "success",
        iconColor: "#fff",
        confirmButtonText: "ปิด",
        confirmButtonColor: "#17A87B",
        allowEnterKey: true,
      });
      forceUpdate();
    } catch (error) {
      Swal.fire({
        background: "#FA4616",
        color: "#fff",
        title: "ผิดพลาด",
        icon: "error",
        text: "Something went wrong!",
        confirmButtonText: "ปิด",
      });
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value !== currentPage) {
      setcurrentPage(value);
      const { data } = await axios.get(
        `/api/petition/paginate?page=${value - 1}&size=8`
      );
      setPetitions(data.content);
    }
  };

  const changeInput = async (event: any) => {
    await setSearchWord(event.target.value);
    forceUpdate();
  };

  const searchSubmit = async () => {
    const { data } = await axios.get(
      `/api/petition/paginate?page=0&size=7&search=${searchWord}`
    );
    setPetitions(data.content);
    setTotalPage(data.totalPages);
    setcurrentPage(1);
  };

  useEffect(() => {
    const fetchPetitions = async () => {
      const { data } = await axios.get(
        `/api/petition/paginate?page=${
          currentPage - 1
        }&size=8&search=${searchWord}`
      );
      setPetitions(data.content);
      setTotalPage(data.totalPages);
    };
    AuthAgencyService.checkToken() ? fetchPetitions() : router.push("/agency");
  }, [reducerValue]);
  return (
    <Agency>
      <div className="flex flex-col h-full space-y-5">
        <div className="flex justify-between items-center">
          <div className="text-3xl">คำร้องขอ</div>
          <div className="flex items-center self-end w-[18.75rem]">
            <input
              onChange={(e) => changeInput(e)}
              placeholder="ค้นหา"
              className="border p-1 px-3 w-full rounded-[0.625rem] focus:outline-none focus:border-primary-light-orange focus:border-2"
            />
            {/* <button
              onClick={searchSubmit}
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button> */}
          </div>
        </div>

        <Table petitions={petitions} isShowModal submit={submit} />
        {totalPage === 0 ? (
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
      </div>
    </Agency>
  );
};

export default application;
