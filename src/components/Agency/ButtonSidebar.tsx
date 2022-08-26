import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Icon from "../Util/Icon";
interface Props {
  text: string;
  path: string;
  mouseEnter: any;
  mouseLeave: any;
  children: React.ReactNode;
}
const ButtonSidebar = ({
  text,
  path,
  mouseEnter,
  mouseLeave,
  children,
}: Props) => {
  const router = useRouter();
  return (
    <Link href={path}>
      <a
        className={`${
          router.pathname === path
            ? "bg-primary-light-yellow text-primary-coquelicot"
            : " hover:bg-primary-light-yellow hover:text-primary-coquelicot text-primary-white "
        } p-3 rounded-lg cursor-pointer text-xl flex justify-between py-2`}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        {text}
        {children}
      </a>
    </Link>
  );
};

export default ButtonSidebar;
