import React from "react";
import { WindowSize } from "../../../helper/useBreakpoint";

type Props = {
  label?: string;
  value?: string;
};

function FormBind({ label, value }: Props) {
  const { isMobile } = WindowSize();
  return (
    <div>
      <div className={`${isMobile ? "text-2xl" : "text-[2rem]"}`}>{label}</div>
      <div
        className={`${
          isMobile ? "text-xl" : "text-2xl"
        } pl-6 bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed`}
      >
        {value}
      </div>
    </div>
  );
}

export default FormBind;
