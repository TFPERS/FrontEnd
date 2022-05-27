import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/index";
import { useState, useEffect } from "react";
import axios from "../../../config/axios.config";
import AuthService from "../../../services/auth.service";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useHeadTitle } from "../../../context/HeadContext";
import { WindowSize } from "../../../helper/useBreakpoint";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Follow() {
  const { setHeadTitle } = useHeadTitle();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    const { data } = await axios.get(
      `/api/petition/me/${AuthService.getCurrentUser().id}?page=${
        value - 1
      }&size=5`
    );
    setPetitions(data.content);
  };

  useEffect(() => {
    setHeadTitle("ติดตามคำร้องและสถานะ");
  });
  const [petitions, setPetitions] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPetition = async () => {
      const { data } = await axios.get(
        `/api/petition/me/${AuthService.getCurrentUser().id}?page=0&size=5`
      );
      setPetitions(data.content);
      setTotalPage(data.totalPages);
    };
    AuthService.checkToken() ? fetchPetition() : router.push("/login");
  }, []);

  const formatTypePetition = (type: any) => {
    if (type === "extendPayment") {
      return "ขยายเวลาชำระเงิน";
    }
  };

  const formatStatus = (status: any) => {
    if (status === "pending") {
      return (
        <div className="bg-[#FFC72C] text-primary-white w-[11.25rem] h-[3.75rem] rounded-[0.625rem] flex items-center justify-center">
          กำลังดำเนินการ
        </div>
      );
    }
    if (status === "success") {
      <div className="bg-[#17A87B] text-primary-white w-[11.25rem] h-[3.75rem] rounded-[0.625rem] flex items-center justify-center">
        เสร็จสิ้น
      </div>;
    }
  };
  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };

  const { isMobile, isTablet, isDesktop } = WindowSize();

  return (
    <Layout>
      <div className="bg-primary-white rounded-[0.625rem] min-h-[67vh] h-full flex flex-col max-w-7xl mx-auto mt-10">
        <div
          className={`${
            isMobile ? "text-3xl p-4 text-center" : "text-4xl p-8"
          } font-semibold `}
        >
          ติดตามคำร้องและสถานะ
        </div>
        <table
          className={`table-fixed w-full text-center overflow-auto ${
            isMobile ? "text-xl" : "text-2xl"
          }`}
        >
          <thead className="border-y-4">
            <tr>
              <th className={`${isMobile ? "p-1" : "p-3"}`}>หมายเลขคำร้อง</th>
              <th>ประเภทคำร้อง</th>
              <th>สถานะคำร้อง</th>
              <th>วันที่</th>
            </tr>
          </thead>
          <tbody className={`${isMobile ? "text-lg" : "text-2xl"} `}>
            {petitions.map((petition: any) => (
              <tr key={petition.id}>
                <td className="py-7">{petition.id}</td>
                <td className="overflow-auto">
                  {formatTypePetition(petition.type)}ค่าลงทะเบียน
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
          <div className="text-center h-4/6 my-auto text-3xl">ไม่มีคำร้อง</div>
        ) : (
          ""
        )}
      </div>
      {totalPage === 0 ? (
        ""
      ) : (
        <div className="mt-3 max-w-lg bg-white mx-auto p-2 rounded-2xl">
          <Stack spacing={2} alignItems="center" color="white">
            <Pagination
              count={totalPage}
              color="secondary"
              size="large"
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      )}

      <Link href="/petition">back </Link>
    </Layout>
  );
}

export default Follow;
