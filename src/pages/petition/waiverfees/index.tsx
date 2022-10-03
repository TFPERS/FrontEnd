import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
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
import { TypePetition } from "../../../enum/TypePetition";
import { StatusPetition } from "../../../enum/StatusPetition";

const WaiverFees = () => {
  const [fileList, setFileList] = useState<any>();
  const [step, setStep] = useState(1);
  const schema = object({});
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

  const submit = async () => {
    if (step === 1) {
      increaseStep();
    }
    if (step === 2) {
      try {
        const studentId = AuthService.getCurrentUser().id;
        await PetitionService.uploadFile(fileList, studentId);
        // increaseStep();
        // setStep(1);
      } catch (error) {
        console.log(error);
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

  const onFileChange: any = (files: any) => {
    const type = TypePetition.waiverfees;
    const status = StatusPetition.Pending;
    const studentId = AuthService.getCurrentUser().id;
    const data: any = {
      type,
      status,
      description: "",
      studentId: studentId,
    };
    const jsonNewInfo = JSON.stringify(data);
    const formData = new FormData();
    formData.append("data", jsonNewInfo);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    setFileList(formData);
  };

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
              <div className="mt-10">
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
