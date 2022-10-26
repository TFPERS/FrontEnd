import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingCircle from "../components/Loading/Circle";
import { useHeadTitle } from "../context/HeadContext";
import getConfig from "next/config";
import { initFirebase } from "../config/firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthGoogleService from "../services/authGoogle.service";
import Swal from "sweetalert2";
function Login() {
  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      router.push("/petition");
    }

    setHeadTitle("เข้าสู่ระบบ");
  });
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const data = await AuthGoogleService.login(result.user.email);
      await toast.success(data.message, {
        theme: "dark",
      });
      await setTimeout(() => {
        router.push("/petition");
      }, 1200);
    } catch (error: any) {
      if (error) {
        if (error.response) {
          const { data } = error.response;
          console.log("data", data);
          Swal.fire({
            title: data.message,
            // text: "ถ้ายกเลิกคำขอแล้ว คำขอนี้จะไม่สามารถดำเนินการต่อ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#30d64c",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/register");
            }
          });
          await toast.error(data.message, {
            theme: "dark",
          });
        }
      }
      console.log(error);
    }
  };

  const { setHeadTitle } = useHeadTitle();
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

  const submitEnter = async (event: any) => {
    try {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsLoading(true);
        const data = await AuthService.login(form.username, form.password);
        await toast.success(data.message, {
          theme: "dark",
        });
        await setTimeout(() => {
          router.push("/petition");
          setIsLoading(false);
        }, 1200);
      }
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

  const submit = async (event: any) => {
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
      <Image src="/images/TFPERSLOGO.png" width={70} height={70} alt="" />
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
              onKeyPress={(e: any) => submitEnter(e)}
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
              onKeyPress={(e: any) => submitEnter(e)}
              className="border rounded-[0.625rem] p-2"
            />
          </div>
          <Link href="/forgettenpassword">
            <div className="self-end cursor-pointer">ลืมรหัสผ่าน ?</div>
          </Link>
          {!isLoading ? (
            <>
              <button
                onClick={submit}
                onKeyPress={(e: any) => submitEnter(e)}
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
          <div
            onClick={() => signInGoogle()}
            className="flex items-center justify-center mt-6 cursor-pointer"
          >
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
