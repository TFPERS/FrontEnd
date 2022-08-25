import React from "react";
import Agency from "../../components/Layout/Agency";
import Card from "../../components/Agency/Card";
import DashboardCard from "../../components/Agency/Dashboard/Card";
import Image from "next/image";

const dashboard = () => {
  return (
    <Agency>
      <div className="flex flex-col space-y-5">
        <div>แดชบอร์ด</div>
        <div className="flex space-x-5">
          <Card>
            <DashboardCard
              img="/images/Mask_user_profile.png"
              title="จำนวนนักศึกษา"
              number={100}
            />
          </Card>
          <Card>
            <DashboardCard
              img="/images/Mask_user_profile.png"
              title="จำนวนคำร้องขอ"
              number={50}
            />
          </Card>
          <Card>
            <DashboardCard
              img="/images/Mask_user_profile.png"
              title="คำร้องขอเสร็จสิ้น"
              number={0}
            />
          </Card>
        </div>
        <div>
          <div>
            <table className={`table-fixed w-full text-center overflow-auto`}>
              <thead className="border-y-4">
                <tr>
                  <th>รหัสเอกสาร</th>
                  <th>รหัสนักศึกษา</th>
                  <th>สถานะคำร้อง</th>
                  <th>วันที่</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">kmutt_sit_nr01_001</td>
                  <td className="">621305000**</td>
                  <td className="">กำลังดำเนินการ</td>
                  <td className="">3/มีนาคม/2022</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Agency>
  );
};

export default dashboard;
