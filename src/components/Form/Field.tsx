import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  label?: string;
  value?: string;
  name: string;
  placeholder?: string;
  onFormValueChange?: any;
  register?: any;
  errorMessage?: any;
};

function FormField({
  errorMessage,
  label,
  value,
  placeholder,
  onFormValueChange,
  name,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <span>
      <label htmlFor={label}>{label} :</label>{" "}
      <input
        id={label}
        className="border-b px-3 focus:outline-0 focus:border-b-2"
        type="text"
        value={value}
        {...register(name)}
        onChange={onFormValueChange}
        placeholder={placeholder}
      />
      <div className="text-sm text-red-500">{errorMessage}</div>
    </span>
  );
}

export default FormField;
