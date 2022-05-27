import Layout from "../components/Layout/index";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "../config/axios.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import authHeader from "../services/auth-header";
import { useForm, FormProvider } from "react-hook-form";
import React from "react";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHeadTitle } from "../context/HeadContext";
import { WindowSize } from "../helper/useBreakpoint";
import { faculties } from "../data/faculties";
import { majors } from "../data/majors";

function Profile() {
  const { setHeadTitle } = useHeadTitle();
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();
  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
  });

  useEffect(() => {
    setHeadTitle("ข้อมูลส่วนตัว");
    const user = localStorage.getItem("user");
    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/student/me/${AuthService.getCurrentUser().id}`
      );
      await setProfile(data);
      if (data) {
        await setForm({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          telephone: data.telephone,
        });
      }
    };
    AuthService.checkToken() ? fetchData() : router.push("/login");
  }, []);

  const toggleUpdateProfile = () => {
    setIsUpdateProfile(!isUpdateProfile);
    setForm({
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      telephone: profile.telephone,
    });
    methods.setValue("firstname", profile.firstname);
    methods.setValue("lastname", profile.lastname);
    methods.setValue("email", profile.email);
    methods.setValue("telephone", profile.telephone);
  };

  const updateProfile = async (formData: any) => {
    // event.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/student/update/${AuthService.getCurrentUser().id}`,
        formData,
        { headers: authHeader() as any }
      );
      const student = await axios.get(
        `/api/student/me/${AuthService.getCurrentUser().id}`
      );
      const {
        firstname,
        lastname,
        id,
        email,
        major,
        faculty,
        telephone,
        createdAt,
        updatedAt,
      } = student.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          firstname,
          lastname,
          email,
          major,
          faculty,
          telephone,
          createdAt,
          updatedAt,
        })
      );
      setProfile(student.data);
      toast.success(data.message, {
        theme: "dark",
      });
    } catch (err: any) {
      if (err) {
        const { data } = err.response;
        toast.error(data.message, {
          theme: "dark",
        });
      }
    }
  };

  const schema = object({
    firstname: string()
      .required("ต้องการชื่อ")
      .max(20, "ใส่ได้ไม่เกิน 20 ตัวอักษร"),
    lastname: string()
      .required("ต้องการนามสกุล")
      .max(20, "ใส่ได้ไม่เกิน 20 ตัวอักษร"),
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
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
  } = methods;

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
      <ToastContainer />
      <div className="h-full mt-28 max-w-5xl mx-auto">
        <div className="relative flex flex-col items-center bg-primary-white pb-20 shadow-3xl  rounded-[1.25rem]">
          <div
            className={`absolute bg-[#FFC72C] flex items-center rounded-full ${
              isMobile ? "-top-20" : "-top-24"
            }`}
          >
            <span
              style={{ fontSize: `${isMobile ? "150px" : "200px"}` }}
              className="text-primary-white material-icons-outlined"
            >
              account_circle
            </span>
          </div>
          <div className={` mt-32 ${isMobile ? "text-4xl" : "text-5xl"}`}>
            ประวัติส่วนตัว
          </div>
          {profile && (
            <div className="flex flex-col text-3xl mt-8 space-y-3 p-2">
              {!isUpdateProfile ? (
                <>
                  {profile.firstname.length > 15 ||
                  profile.lastname.length > 15 ||
                  isMobile ? (
                    <>
                      <span>ชื่อ : {profile.firstname}</span>
                      <span>นามสกุล : {profile.firstname}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        ชื่อ - นามสกุล : {profile.firstname} {profile.lastname}
                      </span>
                    </>
                  )}
                  <span>รหัสนักศึกษา : {profile.id} </span>
                  <span>คณะ : {findFaculty(profile.faculty)}</span>
                  <span>
                    สาขา : {findMajor(profile.major, profile.faculty)}
                  </span>
                  <span>เบอร์โทรศัพท์ : {profile.telephone || "-"}</span>
                  <span>อีเมล : {profile.email}</span>
                </>
              ) : (
                <>
                  <FormProvider {...methods}>
                    <form
                      className="flex flex-col"
                      onSubmit={methods.handleSubmit(updateProfile)}
                    >
                      <span className="w-full">
                        <label htmlFor="ชื่อ" className="w-1/4">
                          ชื่อ :
                        </label>{" "}
                        <input
                          id="ชื่อ"
                          className="border-b px-3 focus:outline-0 focus:border-b-2 w-3/4"
                          placeholder={profile.firstname}
                          {...methods.register("firstname")}
                        />
                        <div className="text-sm text-red-500">
                          {errors?.firstname?.message}
                        </div>
                      </span>
                      <span>
                        <label htmlFor="นามสกุล" className="w-1/4">
                          นามสกุล :
                        </label>{" "}
                        <input
                          id="นามสกุล"
                          className="border-b px-3 focus:outline-0 focus:border-b-2"
                          placeholder={profile.lastname}
                          {...methods.register("lastname")}
                        />
                        <div className="text-sm text-red-500">
                          {errors?.lastname?.message}
                        </div>
                      </span>
                      <span>รหัสนักศึกษา : {profile.id}</span>
                      <span>คณะ : {findFaculty(profile.faculty)}</span>
                      <span>
                        สาขา : {findMajor(profile.major, profile.faculty)}
                      </span>
                      <span className="w-full">
                        <label htmlFor="เบอร์โทรศัพท์" className="w-1/4">
                          เบอร์โทรศัพท์ :
                        </label>{" "}
                        <input
                          id="เบอร์โทรศัพท์"
                          className="border-b px-3 focus:outline-0 focus:border-b-2"
                          placeholder={profile.telephone || "XXXXXXXXXX"}
                          {...methods.register("telephone")}
                        />
                        <div className="text-sm text-red-500">
                          {errors?.telephone?.message}
                        </div>
                      </span>
                      <span>
                        <label htmlFor="อีเมล">อีเมล :</label>{" "}
                        <input
                          id="อีเมล"
                          className="border-b px-3 focus:outline-0 focus:border-b-2"
                          placeholder={profile.email}
                          {...methods.register("email")}
                        />
                        <div className="text-sm text-red-500">
                          {errors?.email?.message}
                        </div>
                      </span>
                      <button
                        // onClick={updateProfile}
                        className="absolute bottom-4 right-10 text-lg bg-green-700 rounded-[0.625rem] p-1 text-white"
                      >
                        ยืนยัน
                      </button>
                    </form>
                  </FormProvider>
                </>
              )}
            </div>
          )}
          <div
            className={`absolute  ${
              isMobile ? "right-4 top-10" : "right-10 top-10"
            }`}
          >
            <button
              onClick={toggleUpdateProfile}
              className="flex rounded-[0.625rem] p-2 items-center bg-primary-coquelicot text-primary-white"
            >
              {isUpdateProfile ? (
                <>
                  <span className="material-icons-outlined">close</span>
                  <span>ยกเลิก</span>
                </>
              ) : (
                <>
                  <span className="material-icons-outlined">edit</span>
                  <span>แก้ไขข้อมูล</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* <Link href="/petition">back</Link> */}
    </Layout>
  );
}

export default Profile;
