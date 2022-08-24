import React from "react";

const Table = () => {
  return (
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
          <td className="py-7">4</td>
          <td className="overflow-auto">ค่าลงทะเบียน</td>
          <td>
            <div className="flex justify-center"></div>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
