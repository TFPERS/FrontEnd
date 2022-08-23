import Link from "next/link";
import React from "react";

interface Props {
  text: string;
  color?: string;
  path: string;
}

const ButtonSidebar = ({ text, color, path }: Props) => {
  return (
    <Link href={path}>
      <a className="hover:bg-primary-light-yellow cursor-pointer p-2">{text}</a>
    </Link>
  );
};

export default ButtonSidebar;
