import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Layout from "../../../components/Layout";
import { WindowSize } from "../../../helper/useBreakpoint";
import { string, object } from "yup";
import DownloadSvg from "../../../../public/svg/download.svg";
import getConfig from "next/config";
import DragDrop from "../../../components/DragDrop";
import AuthService from "../../../services/auth.service";
import PetitionService from "../../../services/petition.service";
const { publicRuntimeConfig } = getConfig();
const backendURL = publicRuntimeConfig.backendUrl;
import Swal from "sweetalert2";
import { TypePetition } from "../../../enum/TypePetition";
import { StatusPetition } from "../../../enum/StatusPetition";
import { majors } from "../../../data/majors";
import { faculties } from "../../../data/faculties";
import StudentService from "../../../services/student.service";
import { useRouter } from "next/router";
import TermService from "../../../services/term";
interface Student {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  major?: string;
  faculty?: string;
  telephone?: string;
  createdAt?: string;
  updatedAt?: string;
}
const WaiverFees = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<Student>({});
  const router = useRouter();
  const schema = object({});
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const increaseStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  const decreaseStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await StudentService.getStudentById(
        AuthService.getCurrentUser().id
      );
      await setUser(data);
    };
    AuthService.checkToken() ? fetchUser() : router.push("/login");
  }, [reducerValue]);

  const submit = async () => {
    if (step === 1) {
      increaseStep();
    }
    if (step === 2) {
      try {
        if (fileList.length === 0) {
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "ผิดพลาด",
            icon: "error",
            text: "กรุณาเลือกไฟล์ที่ต้องการอัพโหลด",
            confirmButtonText: "ปิด",
          });
        } else if (fileList.length < 2) {
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "ผิดพลาด",
            icon: "error",
            text: "กรุณาอัพโหลดสองไฟล์",
            confirmButtonText: "ปิด",
          });
        } else {
          const studentId = AuthService.getCurrentUser().id;
          const type = TypePetition.waiverfees;
          const status = StatusPetition.Pending;
          const data: any = {
            type,
            status,
            term: TermService.dateOfTerm(),
            description: "แจ้งคำร้องขอผ่อนผันค่าเล่าเรียน",
            studentId: studentId,
          };
          const jsonNewInfo = JSON.stringify(data);
          const formData = new FormData();
          formData.append("data", jsonNewInfo);
          for (let i = 0; i < fileList.length; i++) {
            formData.append("files", fileList[i]);
          }
          increaseStep();
          await PetitionService.uploadFile(formData, studentId);
          await Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "กรอกข้อมูลเสร็จสิ้น",
            icon: "success",
            iconColor: "#fff",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#17A87B",
            allowEnterKey: true,
          });
          setFileList([]);
          setStep(1);
        }
      } catch (error: any) {
        Swal.fire({
          background: "#FA4616",
          color: "#fff",
          title: "ผิดพลาด",
          icon: "error",
          text: `${error}`,
          confirmButtonText: "ปิด",
        });
        setStep(1);
      }
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { isMobile, isTablet, isDesktop } = WindowSize();

  const onFileChange: any = async (files: any) => {
    setFileList(files);
  };
  const findFaculty = (faculty: any) => {
    let fac: any = {};
    fac = faculties.find((fac: any) => fac.value === faculty);
    return fac.label;
  };

  const findMajor = (major: any, faculty: any) => {
    let maj: any = {};
    maj = majors.find((ma: any) => ma.name === faculty);
    maj = maj.majors.find((ma: any) => ma.value === major);
    return maj.label;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto ">
        <section className="step-wizard max-w-5xl mx-auto ">
          <ul className="step-wizard-list">
            <li
              className={`step-wizard-item ${
                isMobile ? "min-w-[110px]" : "min-w-[170px]"
              }  ${step === 1 ? "current-item" : ""}`}
            >
              <span className="progress-count ">1</span>
            </li>
            <li
              className={`step-wizard-item ${
                isMobile ? "min-w-[110px]" : "min-w-[170px]"
              } ${step === 2 ? "current-item" : ""}`}
            >
              <span className="progress-count">2</span>
            </li>
            <li
              className={`step-wizard-item ${
                isMobile ? "min-w-[110px]" : "min-w-[170px]"
              } ${step === 3 ? "current-item" : ""}`}
            >
              <span className="progress-count">3</span>
            </li>
          </ul>
        </section>
        <div className="bg-primary-white mx-auto rounded-[0.625rem] mt-10 pt-16 pb-8">
          <div className="max-w-5xl mx-auto p-2 px-3">
            <div
              className={`${isMobile ? "text-2xl text-center" : "text-4xl"} ${
                isTablet ? "" : ""
              } font-semibold`}
            >
              แจ้งคำร้องขอผ่อนผันค่าเล่าเรียน
            </div>
            {step === 1 && (
              <div className="flex justify-around space-x-9 p-10">
                <a
                  href={`${backendURL}/api/petition/downloadRO01`}
                  download
                  className="flex flex-col items-center border-4 rounded-[0.625rem] p-6 relative cursor-pointer max-w-[600px] w-full"
                >
                  <div>
                    <Image
                      src="/images/pdf.png"
                      alt="pdf"
                      width={100}
                      height={100}
                    />
                  </div>
                  ใบคำร้องขอผ่อนผันค่าเทอมระดับปริญญาตรี.pdf
                  <div className="absolute top-2 right-5">
                    <DownloadSvg />
                  </div>
                </a>
                <a
                  href={`${backendURL}/api/petition/downloadRO03`}
                  download
                  className="flex flex-col items-center border-4 rounded-[0.625rem] p-6 relative cursor-pointer max-w-[600px] w-full"
                >
                  <div>
                    <Image
                      src="/images/pdf.png"
                      alt="pdf"
                      width={100}
                      height={100}
                    />
                  </div>
                  หนังสือรับรองของผู้ปกครอง.pdf
                  <div className="absolute top-2 right-5">
                    <DownloadSvg />
                  </div>
                </a>
              </div>
            )}
            {step === 2 && (
              <div className="mt-10 max-h-[360px] overflow-auto">
                <div className="text-black mb-5">
                  <div>
                    <div className={`${isMobile ? "text-2xl" : "text-[2rem]"}`}>
                      รหัสนักศึกษา
                      <div
                        className={`${
                          isMobile ? "text-xl" : "text-2xl"
                        } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                      >
                        {user.id}
                      </div>
                    </div>
                    <div className={`${isMobile ? "text-2xl" : "text-[2rem]"}`}>
                      ชื่อ-นามสกุล
                      <div
                        className={`${
                          isMobile ? "text-xl" : "text-2xl"
                        } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                      >
                        {user.firstname} {user.lastname}
                      </div>
                    </div>
                  </div>
                  {user && (
                    <div
                      className={`flex w-full ${
                        isMobile ? "space-x-5" : "space-x-16"
                      }`}
                    >
                      <div className="w-1/2">
                        <div
                          className={`${isMobile ? "text-2xl" : "text-[2rem]"}`}
                        >
                          คณะ
                        </div>
                        {user.faculty && (
                          <div
                            className={`${
                              isMobile ? "text-xl" : "text-2xl"
                            } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                          >
                            {findFaculty(user.faculty)}
                          </div>
                        )}
                      </div>
                      <div className="w-1/2">
                        <div
                          className={`${isMobile ? "text-2xl" : "text-[2rem]"}`}
                        >
                          สาขา
                        </div>
                        {user.major && (
                          <div
                            className={`${
                              isMobile ? "text-xl" : "text-2xl"
                            } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                          >
                            {findMajor(user.major, user.faculty)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className={`${isMobile ? "text-2xl" : "text-[2rem]"}`}>
                    ปีการศึกษา
                    <div
                      className={`${
                        isMobile ? "text-xl" : "text-2xl"
                      } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                    >
                      {TermService.dateOfTerm()}
                    </div>
                  </div>
                </div>
                <DragDrop onFileChange={(files: any) => onFileChange(files)} />
              </div>
            )}
            <div className="flex justify-end space-x-5 mt-10">
              <form onSubmit={handleSubmit(submit)}>
                <button className="bg-[#17A87B] text-primary-white shadow-3xl rounded-[0.625rem] py-2 w-[6.25rem]">
                  {step === 2 ? "ยืนยัน" : "ถัดไป"}
                </button>
              </form>
              {step === 1 ? (
                <></>
              ) : (
                <>
                  {" "}
                  <button
                    onClick={decreaseStep}
                    className="bg-[#FA2816] text-primary-white shadow-3xl rounded-[0.625rem] py-2 w-[6.25rem] flex justify-center"
                  >
                    แก้ไข
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WaiverFees;
