import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import AuthService from "../services/auth.service";
import axios from "../config/axios.config";
import { useForm, FormProvider } from "react-hook-form";
import { string, number, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingCircle from "../components/Loading/circle";
import { useState } from "react";
import { useRouter } from "next/router";
function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const register = async (formData: any) => {
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
    email: string().email("รูปแบบไม่ถูกต้องอีเมล").required("ต้องการอีเมล"),
    id: string().required("ต้องการรหัสนักศึกษา"),
    firstname: string().required("ต้องการชื่อ"),
    lastname: string().required("ต้องการนามสกุล"),
    password: string().required("ต้องการรหัสผ่าน"),
    major: string().required("ต้องการชื่อคณะ"),
    faculty: string().required("ต้องการชื่อสาขา"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
  } = methods;

  return (
    <div>
      <div className="max-h-screen h-screen flex flex-col justify-center items-center bg-primary-coquelicot">
        <ToastContainer />
        <Image src="/images/TFPERSLOGO.png" width={70} height={70} />
        <div className="text-[2.5rem] font-bold text-primary-white">
          สมัครสมาชิก TFPERS
        </div>
        <form onSubmit={methods.handleSubmit(register)}>
          <div className="flex flex-col items-center bg-primary-white w-[31.25rem] p-4 rounded-[0.625rem]">
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-xl">
                อีเมลมหาวิทยาลัย
              </label>{" "}
              <input
                id="email"
                className="border rounded-[0.625rem] p-2"
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
            <div className="flex">
              <div className="">
                <label htmlFor="major" className="text-xl">
                  คณะ
                </label>{" "}
                <input
                  id="major"
                  className="border rounded-[0.625rem] p-2"
                  {...methods.register("major")}
                />
                <div className="text-sm text-red-500">
                  {errors?.major?.message}
                </div>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="faculty" className="text-xl">
                  สาขา
                </label>{" "}
                <input
                  id="faculty"
                  className="border rounded-[0.625rem] p-2"
                  {...methods.register("faculty")}
                />
                <div className="text-sm text-red-500">
                  {errors?.faculty?.message}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-xl">
                รหัสผ่าน
              </label>{" "}
              <input
                id="password"
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
                className="border rounded-[0.625rem] p-2"
                {...methods.register("telephone")}
              />
              <div className="text-sm text-red-500">
                {errors?.telephone?.message}
              </div>
            </div>
            {!isLoading ? (
              <>
                <button className="mt-6 w-[26.875rem] p-2 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]">
                  สร้างบัญชี
                </button>
              </>
            ) : (
              <>
                <div className="cursor-not-allowed mt-6 w-[26.875rem] p-2 opacity-40 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]">
                  <LoadingCircle />
                </div>
              </>
            )}
          </div>
        </form>
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}

export default Register;
