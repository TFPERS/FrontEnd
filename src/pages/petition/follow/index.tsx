import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout/index";
import { useState, useEffect } from "react";
import axios from "../../../config/axios.config";
import AuthService from "../../../services/auth.service";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useHeadTitle } from "../../../context/HeadContext";

function Follow() {
  const { setHeadTitle } = useHeadTitle();
  setHeadTitle("ติดตามคำร้องและสถานะ");
  const [petitions, setPetitions] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPetition = async () => {
      const { data } = await axios.get(
        `/api/petition/me/${AuthService.getCurrentUser().id}`
      );
      setPetitions(data);
    };
    AuthService.checkToken() ? fetchPetition() : router.push("/login");
    fetchPetition();
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

  return (
    <Layout>
      <div className="bg-primary-white rounded-[0.625rem] w-[1200px] h-[700px] mx-auto mt-10">
        <div className="text-4xl font-semibold p-8 ">ติดตามคำร้องและสถานะ</div>
        <table className="table-fixed w-full text-center text-2xl">
          <thead className="border-y-4">
            <tr>
              <th className="p-3">หมายเลขคำร้อง</th>
              <th>ประเภทคำร้อง</th>
              <th>สถานะคำร้อง</th>
              <th>วันที่</th>
            </tr>
          </thead>
          <tbody>
            {petitions.map((petition: any) => (
              <tr key={petition.id}>
                <td className="py-7">{petition.id}</td>
                <td>{formatTypePetition(petition.type)}ค่าลงทะเบียน</td>
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
      </div>
      <Link href="/petition">back </Link>
    </Layout>
  );
}

export default Follow;
