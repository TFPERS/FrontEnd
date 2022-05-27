import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import AuthService from "../services/auth.service";
import axios from "../config/axios.config";
import { useForm } from "react-hook-form";
import { string, number, object } from "yup";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingCircle from "../components/Loading/Circle";
import { useState } from "react";
import { useRouter } from "next/router";
import { faculties } from "../data/faculties";
import { majors } from "../data/majors";
import { useHeadTitle } from "../context/HeadContext";
function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [optionMajor, setOptionMajor] = useState([]);
  const router = useRouter();
  const { setHeadTitle } = useHeadTitle();
  setHeadTitle("สมัครสมาชิก");
  const register = async (formData: any) => {
    console.log(formData);
    await setIsLoading(true);
    try {
      const data = await AuthService.register(formData);
      toast.success(data.message, {
        theme: "dark",
      });
      const { id, password } = formData;
      await AuthService.login(id, password);
      router.push("/petition");
      setIsLoading(false);
    } catch (err: any) {
      if (err) {
        const { data } = err.response;
        toast.error(data.message, {
          theme: "dark",
        });
        setIsLoading(false);
      }
    }
  };

  const schema = object({
    telephone: string()
      .notRequired()
      .nullable()
      .min(10, "ใส่เบอร์ให้ครบ 10 หลัก")
      .max(10, "ใส่เบอร์ให้ครบ 10 หลัก")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "เบอร์โทรไม่ตรงรูปแบบ 0XXXXXXXXX"
      )
      .transform((value) => (!!value ? value : null)),
    // .required("ต้องการเบอร์โทร")
    email: string()
      .required("ต้องการอีเมล")
      .matches(
        /^\w+([-+.']\w+)*@?(mail.kmutt.ac.th)$/,
        "รูปแบบอีเมลไม่ถูกต้อง"
      ),
    id: string()
      .required("ต้องการรหัสนักศึกษา")
      .min(11, "ใส่ให้ครบ 11 หลัก")
      .max(11, "ใส่ให้ครบ 11 หลัก"),
    firstname: string().required("ต้องการชื่อ"),
    lastname: string().required("ต้องการนามสกุล"),
    password: string().required("ต้องการรหัสผ่าน"),
    major: string().required("ต้องการชื่อสาขา"),
    faculty: string()
      .notOneOf(["default"], "เลือกคณะ")
      .required("ต้องการชื่อคณะ"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
  } = methods;

  const changeData = (e: any) => {
    const facultyValue = e.target.value;
    methods.setError("faculty", { type: "custom", message: "" });
    const selectMajor: any = majors.find(
      (value) => value.name === facultyValue
    );
    const arrayMajor = selectMajor.majors;
    setOptionMajor(arrayMajor);
  };

  return (
    <div>
      <div className="flex space-y-4 flex-col items-center min-h-screen justify-center max-w-lg mx-auto">
        <ToastContainer />
        <Image src="/images/TFPERSLOGO.png" width={70} height={70} />
        <div className="sm:text-[2.5rem] text-3xl font-bold text-primary-white">
          สมัครสมาชิก TFPERS
        </div>
        <form onSubmit={methods.handleSubmit(register)} className="w-full px-4">
          <div className="flex flex-col items-center bg-primary-white p-4 rounded-[0.625rem]">
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-xl">
                อีเมลมหาวิทยาลัย
              </label>{" "}
              <input
                id="email"
                className="border rounded-[0.625rem] p-2"
                placeholder="xxx.xxx@mail.kmutt.ac.th"
                {...methods.register("email")}
              />
              <div className="text-sm text-red-500">
                {errors?.email?.message}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="firstname" className="text-xl">
                ชื่อ
              </label>{" "}
              <input
                id="firstname"
                className="border rounded-[0.625rem] p-2"
                {...methods.register("firstname")}
              />
              <div className="text-sm text-red-500">
                {errors?.firstname?.message}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastname" className="text-xl">
                นามสกุล
              </label>{" "}
              <input
                id="lastname"
                className="border rounded-[0.625rem] p-2"
                {...methods.register("lastname")}
              />
              <div className="text-sm text-red-500">
                {errors?.lastname?.message}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="id" className="text-xl">
                รหัสนักศึกษา
              </label>{" "}
              <input
                id="id"
                className="border rounded-[0.625rem] p-2"
                {...methods.register("id")}
              />
              <div className="text-sm text-red-500">{errors?.id?.message}</div>
            </div>
            <div className="flex w-full space-x-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="faculty" className="text-xl">
                  คณะ
                </label>{" "}
                <select
                  id="faculty"
                  defaultValue={"default"}
                  {...methods.register("faculty")}
                  onChange={(e) => changeData(e)}
                  className="border rounded-[0.625rem] p-2"
                >
                  <option value="default" disabled hidden>
                    เลือกคณะ
                  </option>
                  {faculties.map((faculty: any) => (
                    <option value={faculty.value} key={faculty.value}>
                      {faculty.label}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-red-500">
                  {errors?.faculty?.message}
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="major" className="text-xl">
                  สาขา
                </label>{" "}
                <select
                  id="major"
                  {...methods.register("major")}
                  defaultValue={"default"}
                  disabled={optionMajor.length > 0 ? false : true}
                  className={`${
                    optionMajor.length > 0
                      ? ""
                      : "cursor-not-allowed bg-gray-200"
                  } border rounded-[0.625rem] p-2 overflow-auto`}
                >
                  <option value="default" disabled hidden>
                    {optionMajor.length > 0 ? "เลือกสาขา" : "เลือกคณะก่อน"}
                  </option>
                  {optionMajor.map((data: any) => (
                    <option value={data.value} key={data.value}>
                      {data.label}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-red-500">
                  {errors?.major?.message}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-xl">
                รหัสผ่าน
              </label>{" "}
              <input
                id="password"
                type="password"
                className="border rounded-[0.625rem] p-2"
                {...methods.register("password")}
              />
              <div className="text-sm text-red-500">
                {errors?.password?.message}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="telephone" className="text-xl">
                เบอร์โทรศัพท์ <span className="text-xs">*ไม่จำเป็น</span>
              </label>{" "}
              <input
                id="telephone"
                placeholder="0999999999"
                className="border rounded-[0.625rem] p-2"
                {...methods.register("telephone")}
              />
              <div className="text-sm text-red-500">
                {errors?.telephone?.message}
              </div>
            </div>
            {!isLoading ? (
              <>
                <button className="mt-6 w-full p-2 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]">
                  สร้างบัญชี
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
        {/* <Link href="/">Back</Link> */}
      </div>
    </div>
  );
}

export default Register;
