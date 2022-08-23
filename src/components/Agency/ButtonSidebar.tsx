import React from "react";

interface Props {
  text: string;
  color?: string;
  path?: string;
}

const ButtonSidebar = ({ text, color, path }: Props) => {
  return (
    <div className="hover:bg-primary-light-yellow cursor-pointer p-2">
      {text}
    </div>
  );
};

export default ButtonSidebar;
