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
              <thead className="bg-primary-light-orange text-white text-2xl">
                <tr>
                  <th className="py-5">รหัสเอกสาร</th>
                  <th>รหัสนักศึกษา</th>
                  <th>สถานะคำร้อง</th>
                  <th>วันที่</th>
                </tr>
              </thead>
              <tbody>
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
      </div>
    </Agency>
  );
};

export default dashboard;
