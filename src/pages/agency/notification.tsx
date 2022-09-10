import React, { useEffect, useState } from "react";
import Agency from "../../components/Layout/Agency";
import AuthAgencyService from "../../services/authAgency.service";
import { useForm } from "react-hook-form";
import { string, number, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import Notification from "../../services/notification.service";
import { useRouter } from "next/router";
import socket from "../../config/socketIo.config";

const notice = () => {
  const [notiDescription, setNotiDescription] = useState("");
  const [agency, setAgency] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    AuthAgencyService.checkToken()
      ? setAgency(AuthAgencyService.getCurrentUser())
      : router.push("/agency");
  }, []);

  const schema = object({
    notiDescription: string()
      .required()
      .max(256, "*จำกัดข้อความละ 256 ตัวอักษร"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async ({ notiDescription }: any) => {
    try {
      const agencyId = agency.id;
      const description = notiDescription;
      const { data } = await Notification.addNotiAgency(agencyId, description);
      Swal.fire({
        background: "#FA4616",
        color: "#fff",
        title: "เพิ่มแจ้งเตือนเรียบร้อย",
        icon: "success",
        iconColor: "#fff",
        confirmButtonText: "ปิด",
        confirmButtonColor: "#17A87B",
        allowEnterKey: true,
      });
      socket.emit("send_noti");
      setValue("notiDescription", "");
    } catch (err) {
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
  return (
    <Agency>
      <div className="flex flex-col space-y-5 h-full">
        <div className="text-3xl">แจ้งเตือน</div>
        <div className="flex flex-col bg-primary-light-orange h-5/6 p-10 space-y-4 rounded-lg">
          <div className="text-white">รายละเอียดการแจ้งเตือน</div>
          <textarea
            placeholder="แจ้งเตือน"
            {...register("notiDescription")}
            className="w-full h-full rounded-lg p-6"
          />
          <div className="flex space-x-2 self-end">
            <form onSubmit={handleSubmit(submit)}>
              <button className="shadow-3xl bg-secondary-green p-2 text-white rounded-[0.625rem] w-[8.125rem] text-center">
                ยืนยัน
              </button>
            </form>
            {false && (
              <button className="shadow-3xl bg-secondary-red p-2 text-white rounded-[0.625rem] w-[8.125rem] text-center">
                แก้ไข
              </button>
            )}
          </div>
        </div>
        <span className="text-red-500">{errors?.notiDescription?.message}</span>
      </div>
    </Agency>
  );
};

export default notice;
