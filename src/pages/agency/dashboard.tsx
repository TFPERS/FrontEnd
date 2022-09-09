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
import Petition from "../../services/petition.service";

const dashboard = () => {
  const [numberStudent, setNumberStudent] = useState<number>(0);
  const [numberRequest, setNumberRequest] = useState<number>(0);
  const [numberSuccess, setNumberSuccess] = useState<number>(0);
  const [petitions, setPetitions] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [searchWord, setSearchWord] = useState("");
  const [size, setSize] = useState(7);
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
      const page = value - 1;
      const { data } = await Petition.getPetitionAll(page, size, searchWord);
      setPetitions(data.content);
    }
  };
  const router = useRouter();

  const changeInput = async (event: any) => {
    await setSearchWord(event.target.value);
    forceUpdate();
  };

  useEffect(() => {
    AuthAgencyService.checkToken() ? "" : router.push("/agency");
    fetchNumberStudent();
    fetchNumberRequest();
    fetchNumberSuccess();
  }, []);

  useEffect(() => {
    const fetchPetitions = async () => {
      const page = 0;
      const { data } = await Petition.getPetitionAll(page, size, searchWord);
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
