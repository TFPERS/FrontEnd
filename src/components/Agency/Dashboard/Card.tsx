import React from "react";
import Image from "next/image";
type Props = {
  img: string;
  title: string;
  number: number;
};

const Card = ({ img, title, number }: Props) => {
  return (
    <div className="flex">
      <div className="">
        <Image src={img} alt="" width={30} height={30} />
      </div>
      <div className="w-full">
        <span>{title}</span> <br />
        <span>{number}</span>
      </div>
    </div>
  );
};

export default Card;
