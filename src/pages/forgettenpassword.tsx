import React, { useEffect, useState } from "react";
import Image from "next/image";
import StudentService from "../services/student.service";
import LoadingCircle from "../components/Loading/Circle";
import { useHeadTitle } from "../context/HeadContext";
import { string, number, object } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
const forgettenpassword = () => {
  const { setHeadTitle } = useHeadTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });
  useEffect(() => {
    setHeadTitle("ลืมรหัสผ่าน");
  });
  const onFormValueChange = (event: any) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const schema = object({
    email: string()
      .required("ต้องการอีเมล")
      .notOneOf(
        [
          `${/^\w+([-+.']\w+)*@?(mail.kmutt.ac.th)$/}`,
          `${`${/^\w+([-+.']\w+)*@?(kmutt.ac.th)$/}`}`,
        ],
        "รูปแบบอีเมลไม่ถูกต้อง"
      ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
  } = methods;

  const submitEnter = async (event: any) => {
    try {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsLoading(true);
        const { data } = await StudentService.forgotPassword(form.email);
        Swal.fire({
          background: "#FA4616",
          color: "#fff",
          title: data.message,
          icon: "success",
          iconColor: "#fff",
          confirmButtonText: "ปิด",
          confirmButtonColor: "#17A87B",
          allowEnterKey: true,
        });
        setIsLoading(false);
      }
    } catch (err: any) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        Swal.fire({
          background: "#FA4616",
          color: "#fff",
          title: err.response.data.message,
          icon: "error",
          confirmButtonText: "ปิด",
        });
        setIsLoading(false);
      }
    }
  };

  const submit = async (event: any) => {
    event.preventDefault();
    // setIsLoading(true);
    setIsLoading(true);
    try {
      const { data } = await StudentService.forgotPassword(form.email);
      Swal.fire({
        background: "#FA4616",
        color: "#fff",
        title: data.message,
        icon: "success",
        iconColor: "#fff",
        confirmButtonText: "ปิด",
        confirmButtonColor: "#17A87B",
        allowEnterKey: true,
      });
      setIsLoading(false);
    } catch (err: any) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        Swal.fire({
          background: "#FA4616",
          color: "#fff",
          title: err.response.data.message,
          icon: "error",
          confirmButtonText: "ปิด",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg min-h-screen mx-auto bg-primary-light-orange">
      <Image src="/images/TFPERSLOGO.png" width={70} height={70} alt="" />
      <div className="my-2.5 sm:text-4xl text-3xl font-bold text-primary-white">
        ลืมรหัสผ่าน
      </div>
      <form onSubmit={methods.handleSubmit(submit)} className="w-full px-4">
        <div className="flex flex-col items-center px-5 py-5 bg-primary-white rounded-xl">
          <div className="flex flex-col w-full mt-6 space-y-3">
            <label className="text-xl">ใส่อีเมลของคุณ</label>
            <input
              id="email"
              type="text"
              placeholder="xxx.xxx@mail.kmutt.ac.th หรือ kmutt.ac.th"
              {...methods.register("email")}
              onChange={onFormValueChange}
              onKeyPress={(e: any) => submitEnter(e)}
              className="border rounded-[0.625rem] p-2"
            />
            <div className="text-sm text-red-500">{errors?.email?.message}</div>
          </div>
          {!isLoading ? (
            <>
              <button
                onClick={submit}
                onKeyPress={(e: any) => submitEnter(e)}
                className="mt-6 w-full p-2 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]"
              >
                ยืนยัน
              </button>
            </>
          ) : (
            <>
              <div className="cursor-not-allowed mt-6 w-full p-2 opacity-40 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]">
                <LoadingCircle />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default forgettenpassword;
function useParams(): { userEmail: any } {
  throw new Error("Function not implemented.");
}
