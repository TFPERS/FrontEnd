import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import StudentService from "../../../services/student.service";
import Image from "next/image";
import LoadingCircle from "../../../components/Loading/Circle";
import { useHeadTitle } from "../../../context/HeadContext";
import Swal from "sweetalert2";
const PasswordReset = () => {
  const { setHeadTitle } = useHeadTitle();
  const [email, setEmail] = useState();
  const [form, setForm] = useState({
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { studentId, token } = router.query;
  useEffect(() => {
    setHeadTitle("รีเซ็ตรหัสผ่าน");
    const getVerifyD = async () => {
      try {
        const { data } = await StudentService.getVerify(studentId, token);
        setEmail(data.email);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (studentId && token) {
      getVerifyD();
    }
  }, [studentId]);

  const onFormValueChange = (event: any) => {
    const { name, value } = event.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const submit = async (event: any) => {
    event.preventDefault();
    // setIsLoading(true);
    try {
      const { data } = await StudentService.resetPassword(
        studentId,
        token,
        form.password
      );
      const swal = await Swal.fire({
        background: "#FA4616",
        color: "#fff",
        title: data.message,
        icon: "success",
        iconColor: "#fff",
        confirmButtonText: "ปิด",
        confirmButtonColor: "#17A87B",
        allowEnterKey: true,
      });
      if (swal) {
        router.push("/login");
      }
    } catch (err: any) {
      const { data } = err.response;
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
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-lg min-h-screen mx-auto bg-primary-light-orange">
      <Image src="/images/TFPERSLOGO.png" width={70} height={70} alt="" />
      <div className="my-2.5 sm:text-4xl text-3xl font-bold text-primary-white">
        {email}
      </div>
      <div className="w-full px-4">
        <div className="flex flex-col items-center px-5 py-5 bg-primary-white rounded-xl">
          <div className="flex flex-col w-full mt-6 space-y-3">
            <label className="text-xl">new password</label>
            <input
              type="password"
              placeholder="ใส่อีเมลของคุณ"
              name="password"
              onChange={onFormValueChange}
              className="border rounded-[0.625rem] p-2"
            />
          </div>
          {!isLoading ? (
            <>
              <button
                onClick={submit}
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
      </div>
    </div>
  );
};

export default PasswordReset;
