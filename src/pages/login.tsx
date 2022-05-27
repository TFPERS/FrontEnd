import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingCircle from "../components/Loading/Circle";
import { useHeadTitle } from "../context/HeadContext";

function Login() {
  const { setHeadTitle } = useHeadTitle();
  useEffect(() => {
    setHeadTitle("เข้าสู่ระบบ");
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const data = await AuthService.login(form.username, form.password);
      await toast.success(data.message, {
        theme: "dark",
      });
      await setTimeout(() => {
        router.push("/petition");
        setIsLoading(false);
      }, 1200);
    } catch (err: any) {
      const { data } = err.response;
      toast.error(data.message, {
        theme: "dark",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg min-h-screen mx-auto bg-primary-light-orange">
      <ToastContainer />
      <Image src="/images/TFPERSLOGO.png" width={70} height={70} />
      <div className="my-2.5 sm:text-4xl text-3xl font-bold text-primary-white">
        เข้าสู่ระบบ TFPERS
      </div>
      <div className="w-full px-4">
        <div className="flex flex-col items-center px-5 py-5 bg-primary-white rounded-xl">
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
          <div className="flex flex-col w-full mt-4 space-y-3">
            <label className="text-xl">รหัสผ่าน</label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              name="password"
              value={form.password}
              onChange={onFormValueChange}
              className="border rounded-[0.625rem] p-2"
            />
          </div>
          <div className="self-end">ลืมรหัสผ่าน ?</div>
          {!isLoading ? (
            <>
              <button
                onClick={submit}
                className="mt-6 w-full p-2 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]"
              >
                เข้าสู่ระบบ
              </button>
            </>
          ) : (
            <>
              <div className="cursor-not-allowed mt-6 w-full p-2 opacity-40 bg-primary-coquelicot text-primary-white self-center flex justify-center items-center shadow-3xl rounded-[0.625rem]">
                <LoadingCircle />
              </div>
            </>
          )}

          <div className="flex items-center justify-center mt-6 w-full">
            <div className="h-[10px] w-1/2 mx-8 bg-secondary-gray rounded-lg" />
            <span className="px-10">Or</span>
            <div className="h-[10px] w-1/2 mx-8 bg-secondary-gray rounded-lg" />
          </div>
          <div className="flex items-center justify-center mt-6">
            <Image src="/images/LogoGoogle.png" width={50} height={50} />
          </div>
          <div className="mt-6 space-x-2">
            <span>ยังไม่มีบัญชีใช่ไหม?</span>
            <Link href="/register">
              <span className="text-[#162FB4] cursor-pointer">สมัครเลย</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <Link href="/">Back</Link> */}
    </div>
  );
}

export default Login;
