import React from "react";
import Agency from "../../components/Layout/Agency";
import Card from "../../components/Agency/Card";
import DashboardCard from "../../components/Agency/Dashboard/Card";
import Document from "../../../public/svg/Icon_Document.svg";
import Group from "../../../public/svg/Icon_Group.svg";
import Confirm from "../../../public/svg/Icon_Confirm.svg";

const dashboard = () => {
  return (
    <Agency>
      <div className="flex flex-col space-y-5 h-full">
        <div className="text-3xl">แดชบอร์ด</div>
        <div className="flex space-x-5">
          <Card>
            <DashboardCard title="จำนวนนักศึกษา" number={100}>
              <Group fill="white" />
            </DashboardCard>
          </Card>
          <Card>
            <DashboardCard title="จำนวนคำร้องขอ" number={50}>
              <Document fill="white" />
            </DashboardCard>
          </Card>
          <Card>
            <DashboardCard title="คำร้องขอเสร็จสิ้น" number={0}>
              <Confirm fill="white" />
            </DashboardCard>
          </Card>
        </div>
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
            <tbody className="">
              <tr>
                <td className="py-7">4</td>
                <td className="overflow-auto">ค่าลงทะเบียน</td>
                <td>
                  <div className="flex justify-center"></div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Agency>
  );
};

export default dashboard;
