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

  const submit = (petitionId: any, status: any) => {
    try {
      Petition.updateStatus(petitionId, status);
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
        `/api/petition/paginate?page=${value - 1}&size=7`
      );
      setPetitions(data.content);
    }
  };

  useEffect(() => {
    const fetchPetitions = async () => {
      const { data } = await axios.get(`/api/petition/paginate?page=0&size=8`);
      setPetitions(data.content);
      setTotalPage(data.totalPages);
    };
    AuthAgencyService.checkToken() ? fetchPetitions() : router.push("/agency");
  }, [reducerValue]);
  return (
    <Agency>
      <div className="flex flex-col h-full space-y-5">
        <div className="text-3xl">คำร้องขอ</div>
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
