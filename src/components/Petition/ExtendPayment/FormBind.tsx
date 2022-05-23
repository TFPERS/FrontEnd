import React from "react";

type Props = {
  label?: string;
  value?: string;
};

function FormBind({ label, value }: Props) {
  return (
    <div>
      <div className="text-[2rem]">{label}</div>
      <div className="pl-6 text-2xl w-[500px] bg-[#C4C4C4] rounded-lg p-2 cursor-not-allowed">
        {value}
      </div>
    </div>
  );
}

export default FormBind;
