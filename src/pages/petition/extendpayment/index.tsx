import Link from "next/link";
import React from "react";
import Layout from "../../../components/Layout/";
import { useEffect, useState } from "react";
import axios from "../../../config/axios.config";
import AuthService from "../../../services/auth.service";
import { useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormBind from "../../../components/Petition/ExtendPayment/FormBind";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useHeadTitle } from "../../../context/HeadContext";
import { WindowSize } from "../../../helper/useBreakpoint";
import { faculties } from "../../../data/faculties";
import { majors } from "../../../data/majors";
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
    note: string().required("โปรดกรอกหมายเหตุ"),
  });

  const router = useRouter();

  useEffect(() => {
    setHeadTitle("แจ้งคำร้องขยายเวลาชำระเงิน");
    const fetchUser = async () => {
      const { data } = await axios.get(
        `/api/student/me/${AuthService.getCurrentUser().id}`
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
        const type = "extendPayment";
        const status = "pending";
        try {
          increaseStep();
          const { data } = await axios.post("/api/petition/form", {
            type,
            status,
            description: note,
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
            confirmButtonText: "ปิด",
          });
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
        <div className="bg-primary-white mx-auto rounded-[0.625rem] mt-10 pt-16 pb-8">
          <div className="max-w-5xl mx-auto p-2 px-3">
            <div
              className={`${isMobile ? "text-3xl text-center" : "text-4xl"} ${
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
                <div className="flex w-full space-x-16">
                  <div className="w-1/2">
                    <div className="text-[2rem]">คณะ</div>
                    {user.faculty && (
                      <div className="pl-6 text-2xl bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed">
                        {findFaculty(user.faculty)}
                      </div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <div className="text-[2rem]">สาขา</div>
                    {user.major && (
                      <div className="pl-6 text-2xl bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed">
                        {findMajor(user.major, user.faculty)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="note" className="text-[2rem]">
                  หมายเหตุ
                </label>
                {step === 1 ? (
                  <>
                    <input
                      placeholder="หมายเหตุ"
                      {...register("note")}
                      className="pl-6 text-2xl rounded-lg p-2 border-4 border-[#C4C4C4]"
                    />
                    <span className="text-red-500">
                      {errors?.note?.message}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="pl-6 text-2xl bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed">
                      {note}
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
        {/* <Link href="/petition">
          <a>back</a>
        </Link> */}
      </div>
    </Layout>
  );
}

export default ExtentPayment;
