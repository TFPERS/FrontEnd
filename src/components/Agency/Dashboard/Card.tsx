import React from "react";
import Image from "next/image";
type Props = {
  title: string;
  number: number;
  children: React.ReactNode;
};

const Card = ({ title, number, children }: Props) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div>{children}</div>
      <div>
        <span>{title}</span> <br />
        <span>{number}</span>
      </div>
    </div>
  );
};

export default Card;
