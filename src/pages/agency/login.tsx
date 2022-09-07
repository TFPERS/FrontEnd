import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthAgencyService from "../../services/authAgency.service";
import LoadingCircle from "../../components/Loading/Circle";

const login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    AuthAgencyService.getCurrentUser() ? router.push("/agency/dashboard") : "";
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
        const data = await AuthAgencyService.login(
          form.username,
          form.password
        );
        await toast.success(data.message, {
          theme: "dark",
        });
        await setTimeout(() => {
          router.push("/agency/dashboard");
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
      const data = await AuthAgencyService.login(form.username, form.password);
      await toast.success(data.message, {
        theme: "dark",
      });
      await setTimeout(() => {
        router.push("/agency/dashboard");
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
      <div className="my-2.5 sm:text-3xl text-2xl font-semibold text-primary-white text-center">
        เข้าสู่ระบบ TFPERS <br />
        ของหน่วยงาน
      </div>
      <div className="w-full px-4">
        <div className="flex flex-col items-center px-5 py-5 bg-primary-white rounded-xl">
          <div className="flex flex-col w-full mt-6 space-y-3">
            <label className="text-xl">บัญชีผู้ใช้</label>
            <input
              type="text"
              placeholder="บัญชีผู้ใช้"
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
        </div>
      </div>
    </div>
  );
};

export default login;
