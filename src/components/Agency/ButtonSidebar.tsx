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
      <a className="p-2 rounded-lg cursor-pointer hover:bg-primary-light-yellow hover:text-primary-coquelicot text-primary-white">
        {text}
      </a>
    </Link>
  );
};

export default ButtonSidebar;
