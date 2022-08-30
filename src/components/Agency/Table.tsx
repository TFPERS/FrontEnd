import React, { useState } from "react";
import dayjs from "dayjs";
import Paginate from "../../components/Paginate";
import axios from "../../config/axios.config";
type Props = {
  petitions: any;
};
const formatStatus = (status: any) => {
  if (status === "pending") {
    return <div>กำลังดำเนินการ</div>;
  }
  if (status === "success") {
    <div>เสร็จสิ้น</div>;
  }
};
const formatDD = (date: any) => {
  const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
  return <div>{format}</div>;
};
const Table = ({ petitions }: Props) => {
  return (
    <div className="h-full border-2">
      <table className={`table-fixed w-full text-center overflow-auto`}>
        <thead className="bg-primary-light-orange text-white text-2xl">
          <tr>
            <th className="py-9">รหัสเอกสาร</th>
            <th>รหัสนักศึกษา</th>
            <th>สถานะคำร้อง</th>
            <th>วันที่</th>
          </tr>
        </thead>
        <tbody>
          {petitions.map((petition: any) => (
            <tr key={petition.id}>
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
    </div>
  );
};

export default Table;
