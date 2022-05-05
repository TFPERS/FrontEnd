import Button from "../../components/Button";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center cursor-pointer">
        <Image
          src="/images/TFPERSLOGO.png "
          alt="TFPERSLogo"
          width={130}
          height={90}
        />
        <h1 className="text-5xl text-white font-bold">TFPERS</h1>
      </div>
      <div className="flex space-x-4">
        <Button text="เข้าสู่ระบบ" color="bg-[#F24B1C]" path="/login" />
        <Button text="สมัคร" color="bg-secondary" path="/register" />
      </div>
    </header>
  );
}
