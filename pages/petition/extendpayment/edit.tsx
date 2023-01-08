import React from "react";
import Layout from "../../../components/Layout/";
import { faculties } from "../../../data/faculties";
import { majors } from "../../../data/majors";
import { WindowSize } from "../../../helper/useBreakpoint";
import FormBind from "../../../components/Petition/ExtendPayment/FormBind";
import { useEffect, useState } from "react";
import { StatusPetition } from "../../../enum/StatusPetition";
import { TypePetition } from "../../../enum/TypePetition";
import axios from "../../../config/axios.config";
import TermService from "../../../services/term";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import AuthService from "../../../services/auth.service";
import StudentService from "../../../services/student.service";
import PetitionService from "../../../services/petition.service";
import { useRouter } from "next/router";

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

const edit = () => {
  const router = useRouter();
  const [step, setStep] = useState<any>(1);
  const [description, setDescription] = useState();
  const [user, setUser] = useState<Student>({});

  useEffect(() => {
    const fetchUser = async () => {
      const petitionId = localStorage.getItem("editextendpayment");
      const { data } = await StudentService.getStudentById(
        AuthService.getCurrentUser().id
      );
      await setUser(data);
      try {
        const { data } = await PetitionService.getOnePetition(
          petitionId,
          AuthService.getCurrentUser().id
        );
        setDescription(data.petition.description);
      } catch (error: any) {
        const { data } = await error.response;
        if (error.response.status === 404) {
          router.push("/");
        }
      }
    };
    AuthService.checkToken() ? fetchUser() : router.push("/login");
  }, []);

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
  const schema = object({
    description: string()
      .trim()
      .max(255, "จำกัดข้อความละ 255 ตัวอักษร")
      .required("โปรดกรอกรายละเอียด"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async ({ description }: any) => {
    const petitionId = localStorage.getItem("editextendpayment");
    if (description) {
      if (step === 1) {
        setDescription(description);
        increaseStep();
      }
      if (step === 2) {
        const type = TypePetition.extendPayment;
        const status = StatusPetition.Pending;
        try {
          increaseStep();
          const { data } = await PetitionService.updateDescription(
            petitionId,
            status,
            description
          );
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "อัพเดตข้อมูลเสร็จสิ้น",
            icon: "success",
            iconColor: "#fff",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#17A87B",
            allowEnterKey: true,
          });
          setStep(1);
          // setValue("note", "");
        } catch (error) {
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "ผิดพลาด",
            icon: "error",
            text: "Something went wrong!",
            confirmButtonText: "ปิด",
          });
          setStep(1);
        }
      }
    }
  };

  const { isMobile, isTablet, isDesktop } = WindowSize();
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
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
        <div className="bg-primary-white mx-auto rounded-[0.625rem] mt-10 pt-6 pb-5">
          <div className="max-w-5xl mx-auto p-2 px-3">
            <div
              className={`${isMobile ? "text-xl text-center" : "text-4xl"} ${
                isTablet ? "" : ""
              } font-semibold`}
            >
              แจ้งคำร้องขยายเวลาชำระเงิน
            </div>
            <div className="max-w-4xl ml-auto">
              <FormBind label="รหัสนักศึกษา" value={user.id} />
              <FormBind
                label="ชื่อ-นามสกุล"
                value={`${user.firstname} ${user.lastname}`}
              />
              {user && (
                <div
                  className={`flex w-full ${
                    isMobile ? "flex-col" : "space-x-16"
                  }`}
                >
                  <div className={`${isMobile ? "w-full" : "w-1/2"} `}>
                    <div className={`${isMobile ? "text-xl" : "text-[2rem]"}`}>
                      คณะ
                    </div>
                    {user.faculty && (
                      <div
                        className={`${
                          isMobile ? "text-lg" : "text-2xl"
                        } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                      >
                        {findFaculty(user.faculty)}
                      </div>
                    )}
                  </div>
                  <div className={`${isMobile ? "w-full" : "w-1/2"} `}>
                    <div className={`${isMobile ? "text-xl" : "text-[2rem]"}`}>
                      สาขา
                    </div>
                    {user.major && (
                      <div
                        className={`${
                          isMobile ? "text-lg" : "text-2xl"
                        } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                      >
                        {findMajor(user.major, user.faculty)}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className={`${isMobile ? "text-xl" : "text-[2rem]"}`}>
                ปีการศึกษา
                <div
                  className={`${
                    isMobile ? "text-lg" : "text-2xl"
                  } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
                >
                  {TermService.dateOfTerm()}
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className={`${isMobile ? "text-xl" : "text-[2rem]"}`}
                >
                  รายละเอียด
                </label>
                {step === 1 ? (
                  <>
                    <textarea
                      placeholder="รายละเอียด"
                      value={description}
                      {...register("description", {
                        onChange: (e) => {
                          setDescription(e.target.value);
                        },
                      })}
                      className={`
                  ${isMobile ? "text-lg h-20" : "text-2xl h-28"}
                  pl-6 rounded-lg p-2 border-4 border-[#C4C4C4] resize-none`}
                    />
                    <span className="text-red-500">
                      {errors?.note?.message}
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      className={`
                ${isMobile ? "text-xl h-20" : "text-2xl h-28"}
                pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed overflow-auto overflow-x-hidden`}
                    >
                      <span className="break-words">{description}</span>
                    </div>
                  </>
                )}
              </div>
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
      </div>
    </Layout>
  );
};

export default edit;
