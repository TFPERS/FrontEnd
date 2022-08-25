import Link from "next/link";
import React from "react";
import Image from "next/image";

interface Props {
  text: string;
  color?: string;
  path: string;
  img: string;
}

const ButtonSidebar = ({ img, text, color, path }: Props) => {
  return (
    <Link href={path}>
      <a className="p-2 rounded-lg cursor-pointer hover:bg-primary-light-yellow hover:text-primary-coquelicot text-primary-white text-xl flex justify-between py-2">
        {text}
        <Image src={img} alt="" width={30} height={30} />
      </a>
    </Link>
  );
};

export default ButtonSidebar;
