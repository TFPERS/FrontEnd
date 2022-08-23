import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className="bg-primary-light-orange space-y-7 text-white rounded-[0.625rem] w-full h-full text-center p-3">
      {children}
    </div>
  );
};

export default Card;
