import { forwardRef } from "react";

type InputProps = {
  name: string;
  inputType: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

type Ref = HTMLInputElement | null;

const Input = forwardRef<Ref, InputProps>(
  (
    { name, inputType, label, placeholder, required = false },
    ref
  ) => {
    const formLabelInputClasses = "flex flex-col mt-2";
    const labelClasses = "font-bold";
    const inputClasses =
      "w-full p-1 text-gray-800 outline-none border border-yellow-700 rounded-sm px-1 placeholder:text-sm";

    return (
      <div className={formLabelInputClasses}>
        <label htmlFor={name} className={labelClasses}>
          {label}:
        </label>
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          minLength={inputType === "password" ? 6 : 0}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
