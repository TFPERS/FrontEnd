import Link from "next/link";
import React from "react";
import Layout from "../../../components/Layout/";
import { useEffect, useState } from "react";
import axios from "../../../config/axios.config";
import AuthService from "../../../services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import FormBind from "../../../components/Petition/ExtendPayment/FormBind";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useHeadTitle } from "../../../context/HeadContext";
import { WindowSize } from "../../../helper/useBreakpoint";
import { faculties } from "../../../data/faculties";
import { majors } from "../../../data/majors";
import { StatusPetition } from "../../../enum/StatusPetition";
import { TypePetition } from "../../../enum/TypePetition";
import StudentService from "../../../services/student.service";
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

function ExtentPayment() {
  const { setHeadTitle } = useHeadTitle();
  const [user, setUser] = useState<Student>({});
  const [step, setStep] = useState(1);
  const [note, setNote] = useState();

  const schema = object({
    note: string()
      .trim()
      .max(255, "จำกัดข้อความละ 255 ตัวอักษร")
      .required("โปรดกรอกรายละเอียด"),
  });

  const router = useRouter();

  useEffect(() => {
    setHeadTitle("แจ้งคำร้องขยายเวลาชำระเงิน");
    const fetchUser = async () => {
      const { data } = await StudentService.getStudentById(
        AuthService.getCurrentUser().id
      );
      await setUser(data);
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = async ({ note }: any) => {
    if (note) {
      if (step === 1) {
        setNote(note);
        increaseStep();
      }
      if (step === 2) {
        const type = TypePetition.extendPayment;
        const status = StatusPetition.Pending;
        try {
          increaseStep();
          const { data } = await axios.post("/api/petition/form", {
            type,
            status,
            description: note,
            note: "",
            term: TermService.dateOfTerm(),
            studentId: user.id,
          });
          Swal.fire({
            background: "#FA4616",
            color: "#fff",
            title: "กรอกข้อมูลเสร็จสิ้น",
            icon: "success",
            iconColor: "#fff",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#17A87B",
            allowEnterKey: true,
          });
          setStep(1);
          setValue("note", "");
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
                  htmlFor="note"
                  className={`${isMobile ? "text-xl" : "text-[2rem]"}`}
                >
                  รายละเอียด
                </label>
                {step === 1 ? (
                  <>
                    <textarea
                      placeholder="รายละเอียด"
                      {...register("note")}
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
                      <span className="break-words">{note}</span>
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
}

export default ExtentPayment;
