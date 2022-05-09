import Button from "../../components/Button";
import Image from "next/image";

type Props = {
  isLogin?: boolean;
};

export default function Navbar({ isLogin = true }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <Image
          src="/images/TFPERSLOGO.png "
          alt="TFPERSLogo"
          width={90}
          height={90}
        />
        <h1 className="text-5xl text-white font-bold ml-5">TFPERS</h1>
      </div>
      {isLogin ? (
        <div className="flex space-x-4 text-white font-normal">
          <span
            style={{ fontSize: "3.125rem" }}
            className="material-icons-outlined cursor-pointer"
          >
            notifications
          </span>
          <span
            style={{ fontSize: "3.125rem" }}
            className="material-icons-outlined cursor-pointer text-4xl"
          >
            account_circle
          </span>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Button text="เข้าสู่ระบบ" color="bg-[#F24B1C]" path="/login" />
          <Button
            text="สมัคร"
            color="bg-primary-light-yellow"
            path="/register"
          />
        </div>
      )}
    </header>
  );
}
