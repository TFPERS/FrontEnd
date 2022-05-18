import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
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

  const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const data = await AuthService.login(form.username, form.password);
      router.push("/petition");
    } catch (err: any) {
      const { data } = err.response;
      toast.error(data.message, {
        theme: "dark",
      });
    }
  };

  return (
    <div className="max-h-screen h-screen flex flex-col justify-center items-center bg-primary-coquelicot">
      <ToastContainer />
      <Image src="/images/TFPERSLOGO.png" width={70} height={70} />
      <div className="text-[2.5rem] font-bold text-primary-white">
        เข้าสู่ระบบ TFPERS
      </div>
      <div className="flex flex-col items-center bg-primary-white w-[31.25rem] h-[34.6875rem] p-4 rounded-[0.625rem]">
        <div className="flex flex-col w-full mt-6 space-y-3">
          <label className="text-xl">บัญชีผู้ใช้หรืออีเมล</label>
          <input
            type="text"
            placeholder="บัญชีผู้ใช้หรืออีเมล"
            name="username"
            value={form.username}
            onChange={onFormValueChange}
            className="border rounded-[0.625rem] p-2"
          />
        </div>
        <div className="flex flex-col w-full space-y-3 mt-4">
          <label className="text-xl">รหัสผ่าน</label>
          <input
            type="text"
            placeholder="รหัสผ่าน"
            name="password"
            value={form.password}
            onChange={onFormValueChange}
            className="border rounded-[0.625rem] p-2"
          />
        </div>
        <div className="self-end">ลืมรหัสผ่าน ?</div>
        <button
          onClick={submit}
          className="mt-6 w-[26.875rem] p-2 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]"
        >
          เข้าสู่ระบบ
        </button>
        <div className="mt-6 flex justify-center items-center">
          <div className="h-[10px] w-[100px] bg-secondary-gray rounded-lg"></div>
          <span className="px-10">Or</span>
          <div className="h-[10px] w-[100px] bg-secondary-gray rounded-lg"></div>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <Image src="/images/LogoGoogle.png" width={50} height={50} />
        </div>
        <div className="mt-6 space-x-2">
          <span>ยังไม่มีบัญชีใช่ไหม?</span>
          <span className="text-[#162FB4]">สมัครเลย</span>
        </div>
      </div>
      <Link href="/">Back</Link>
    </div>
  );
}

export default Login;
