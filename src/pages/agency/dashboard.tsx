import React, { useEffect, useReducer, useState } from "react";
import Agency from "../../components/Layout/Agency";
import Card from "../../components/Agency/Card";
import DashboardCard from "../../components/Agency/Dashboard/Card";
import Document from "../../../public/svg/Icon_Document.svg";
import Group from "../../../public/svg/Icon_Group.svg";
import Confirm from "../../../public/svg/Icon_Confirm.svg";
import axios from "../../config/axios.config";
import dayjs from "dayjs";
import Paginate from "../../components/Paginate";
import Table from "../../components/Agency/Table";
import { useRouter } from "next/router";
import AuthAgencyService from "../../services/authAgency.service";

const dashboard = () => {
  const [numberStudent, setNumberStudent] = useState<number>(0);
  const [numberRequest, setNumberRequest] = useState<number>(0);
  const [numberSuccess, setNumberSuccess] = useState<number>(0);
  const [petitions, setPetitions] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [searchWord, setSearchWord] = useState("");
  const fetchNumberStudent = async () => {
    const { data } = await axios.get(`/api/agency/numberOfStudent`);
    setNumberStudent(data.numberAllStudent);
  };
  const fetchNumberRequest = async () => {
    const { data } = await axios.get(`/api/agency/numberOfRequest`);
    setNumberRequest(data.numberOfRequestPending);
  };
  const fetchNumberSuccess = async () => {
    const { data } = await axios.get(`/api/agency/numberOfRequestSuccess`);
    setNumberSuccess(data.numberOfRequestSuccess);
  };
  const formatStatus = (status: any) => {
    if (status === "pending") {
      return <div>กำลังดำเนินการ</div>;
    }
    if (status === "success") {
      <div>เสร็จสิ้น</div>;
    }
  };
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value !== currentPage) {
      setcurrentPage(value);
      const { data } = await axios.get(
        `/api/petition/paginate?page=${value - 1}&size=7&search=${searchWord}`
      );
      setPetitions(data.content);
    }
  };
  const router = useRouter();

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

  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };
  useEffect(() => {
    AuthAgencyService.checkToken() ? "" : router.push("/agency");
    fetchNumberStudent();
    fetchNumberRequest();
    fetchNumberSuccess();
  }, []);

  useEffect(() => {
    const fetchPetitions = async () => {
      const { data } = await axios.get(
        `/api/petition/paginate?page=0&size=7&search=${searchWord}`
      );
      setPetitions(data.content);
      setTotalPage(data.totalPages);
      setcurrentPage(1);
    };
    fetchPetitions();
  }, [reducerValue]);

  return (
    <Agency>
      <div className="flex flex-col space-y-5 h-full">
        <div className="flex justify-between items-center">
          <div className="text-3xl">แดชบอร์ด</div>
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
        <div className="flex space-x-5">
          <Card>
            <DashboardCard title="จำนวนนักศึกษา" number={numberStudent}>
              <Group fill="white" />
            </DashboardCard>
          </Card>
          <Card>
            <DashboardCard title="จำนวนคำร้องขอ" number={numberRequest}>
              <Document fill="white" />
            </DashboardCard>
          </Card>
          <Card>
            <DashboardCard title="คำร้องขอเสร็จสิ้น" number={numberSuccess}>
              <Confirm fill="white" />
            </DashboardCard>
          </Card>
        </div>
        <Table petitions={petitions} isShowModal={false} />
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

export default dashboard;
