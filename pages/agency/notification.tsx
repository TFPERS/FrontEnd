import React, { useEffect, useReducer, useState } from "react";
import Agency from "../../components/Layout/Agency";
import AuthAgencyService from "../../services/authAgency.service";
import { useForm } from "react-hook-form";
import { string, number, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import Notification from "../../services/notification.service";
import { useRouter } from "next/router";
import Paginate from "../../components/Paginate";
import Image from "next/image";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import socket from "../../config/socketIo.config";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const notice = () => {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const fetchNoti = async () => {
      const page = currentPage - 1;
      const { data } = await Notification.getNotiPaginate(
        page,
        size,
        searchWord
      );
      setAgency(AuthAgencyService.getCurrentUser());
      setNotiList(data.content);
      setTotalPage(data.totalPages);
    };
    AuthAgencyService.checkToken() ? fetchNoti() : router.push("/agency");
  }, [reducerValue]);
  const [notiDescription, setNotiDescription] = useState("");
  const [agency, setAgency] = useState<any>(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [notiStatus, setNotiStatus] = useState<any>("manage");
  const [notiList, setNotiList] = useState<any>([]);
  const [searchWord, setSearchWord] = useState("");
  const router = useRouter();
  const [size, setSize] = useState(9);
  const [open, setOpen] = useState(false);
  const [selectNotiId, setSelectNotiId] = useState();
  const [selectNotiDes, setSelectNotiDes] = useState("");

  const onFormValueChange = (event: any) => {
    setSelectNotiDes(event.target.value);
  };

  const handleOpen = (notiId: any, notiDescript: any) => {
    setSelectNotiId(notiId);
    setSelectNotiDes(notiDescript);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
      // socket.emit("send_noti");
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

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value !== currentPage) {
      setcurrentPage(value);
      const page = value - 1;
    }
  };

  const deleteNoti = async (notiId: any) => {
    Swal.fire({
      title: "คุณต้องการลบการแจ้งเตือนนี้หรือไม่",
      text: "ถ้ายกเลิกการแจ้งเตือนนี้แล้ว การแจ้งเตือนนี้จะหายไป",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30d64c",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Notification.deleteNoti(notiId);
        Swal.fire(
          "ลบการแจ้งเตือนเรียบร้อย",
          "การแจ้งเตือนนี้ถูกลบเรียบร้อย",
          "success"
        );
        forceUpdate();
      }
    });
  };

  const updateNoti = async () => {
    setOpen(false);
    try {
      const result = await Swal.fire({
        customClass: {
          container: "my-swal",
        },
        title: "คุณต้องแก้ไขการแจ้งเตือนนี้หรือไม่",
        text: "การแจ้งเตือนนี้จะถูกแก้ไข",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30d64c",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      });
      if (result.isConfirmed) {
        try {
          Notification.updateNoti(selectNotiId, selectNotiDes);
          Swal.fire(
            "แก้ไขการแจ้งเตือนเรียบร้อย",
            "การแจ้งเตือนนี้ถูกแก้ไขเรียบร้อย",
            "success"
          );
          forceUpdate();
        } catch (error) {
          console.log(error);
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "ผิดพลาด",
            icon: "error",
            text: "แก้ไข",
            confirmButtonText: "ปิด",
          });
          setOpen(true);
        }
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        background: "#FA4616",
        color: "#fff",
        title: "ผิดพลาด",
        icon: "error",
        text: "แก้ไข",
        confirmButtonText: "ปิด",
      });
    }
  };

  const formatDD = (date: any) => {
    const format = dayjs(date).format("DD/MM/YYYY \n HH:mm A");
    return <div>{format}</div>;
  };
  return (
    <Agency>
      <div className="flex flex-col space-y-3 h-full">
        <div className="text-3xl">แจ้งเตือน</div>
        <div className="flex space-x-2">
          <div
            onClick={() => setNotiStatus("create")}
            className={`${
              notiStatus === "create"
                ? "bg-primary-light-orange text-white"
                : "text-black border-primary-light-orange"
            }    border-2 rounded-lg p-2 w-16 text-center cursor-pointer`}
          >
            สร้าง
          </div>
          <div
            onClick={() => setNotiStatus("manage")}
            className={` ${
              notiStatus === "manage"
                ? "bg-primary-light-orange text-white"
                : "text-black border-primary-light-orange"
            }  border-2 rounded-lg p-2 w-16 text-center cursor-pointer`}
          >
            จัดการ
          </div>
        </div>
        {notiStatus === "create" ? (
          <>
            {" "}
            <div className="flex flex-col bg-primary-light-orange h-5/6 p-10 space-y-4 rounded-lg">
              <div className="text-white">รายละเอียดการแจ้งเตือน</div>
              <textarea
                placeholder="แจ้งเตือน"
                {...register("notiDescription")}
                className="w-full h-full rounded-lg p-6 resize-none"
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
            <span className="text-red-500">
              {errors?.notiDescription?.message}
            </span>
          </>
        ) : notiStatus === "manage" ? (
          <>
            <div className="grid grid-rows-3 grid-cols-3 gap-5 h-full">
              {notiList.map((noti: any) => (
                <div
                  className="bg-white shadow-3xl border-2 border-primary-light-orange rounded-xl flex flex-col relative p-2 space-y-3"
                  key={noti.id}
                >
                  <div className="flex space-x-2 text-black">
                    <Image
                      src="/images/Profile.png "
                      alt="HappyStudent"
                      width={30}
                      height={30}
                    />
                    <div className="font-semibold break-words">
                      {noti.agency.name}
                      {noti.id}
                    </div>
                  </div>
                  <div className="text-sm break-words h-[6.5625rem] overflow-auto">
                    {noti.description}
                  </div>
                  <div className="text-sm break-words mt-auto flex items-center">
                    <div>{formatDD(noti.updatedAt)}</div>
                    <div className="ml-auto">
                      <div className="flex space-x-4">
                        <div
                          onClick={() => handleOpen(noti.id, noti.description)}
                          className="cursor-pointer bg-primary-light-yellow p-1 w-10 text-center text-white rounded-lg"
                        >
                          แก้ไข
                        </div>
                        <div
                          onClick={() => deleteNoti(noti.id)}
                          className="cursor-pointer bg-red-600 p-1 w-10 text-center text-white rounded-lg"
                        >
                          ลบ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
            <div className="">
              {totalPage === 0 ? (
                ""
              ) : (
                <div className="mt-auto max-w-lg bg-white shadow-4xl mx-auto p-2 rounded-2xl">
                  <Paginate
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handleChange={handleChange}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            แก้ไขการแจ้งเตือน
          </Typography>
          <textarea
            placeholder="แจ้งเตือน"
            value={selectNotiDes}
            onChange={(e) => onFormValueChange(e)}
            className="w-full h-52 rounded-lg p-3 border-2 resize-none "
          />
          <div className="flex space-x-4">
            <div
              onClick={() => updateNoti()}
              className="cursor-pointer text-center p-1 rounded text-white bg-green-500"
            >
              ยืนยัน
            </div>
            <div
              onClick={handleClose}
              className="cursor-pointer text-center p-1 rounded text-white bg-red-500"
            >
              ยกเลิก
            </div>
          </div>
        </Box>
      </Modal>
    </Agency>
  );
};

export default notice;
