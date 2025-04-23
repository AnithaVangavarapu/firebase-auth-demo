import {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from "react-hook-form";
import clsx from "clsx";
import { twMerge } from "tw-merge";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
interface ClassNamesProps {
  div?: string;
  label?: string;
  error?: string;
  input?: string;
}
interface InputProps<T extends FieldValues> {
  label?: string;
  register: UseFormRegister<T>;
  type: "password";
  name: Path<T>;
  rules?: RegisterOptions<T>;
  error?: string;
  classnames?: ClassNamesProps;
  placeholder?: string;
  readonly?: boolean;
}
const Input = <T extends FieldValues>({
  label,
  register,
  type,
  name,
  rules,
  error,
  classnames,
  placeholder,
  readonly,
}: InputProps<T>) => {
  const [inputType, setInputType] = useState<string>(type);
  return (
    <div className="flex flex-col relative" style={{ width: "100%" }}>
      {label && (
        <label className={twMerge(clsx("text-sm", classnames?.label))}>
          {label}
        </label>
      )}
      <div
        className={twMerge(
          clsx(
            "flex border px-1 py-0.5 rounded-[5px] justify-between  items-center",
            classnames?.div,
            `${error && "border-red-400"}`
          )
        )}
      >
        <input
          type={inputType}
          {...register(name, rules)}
          className={twMerge(
            clsx(" focus:outline-none w-full text-[14px]", classnames?.input)
          )}
          placeholder={placeholder}
          readOnly={readonly}
        />
        {inputType === "password" ? (
          <EyeOff onClick={() => setInputType("text")} width={15} />
        ) : (
          <Eye onClick={() => setInputType("password")} width={15} />
        )}
      </div>
      {error && (
        <p
          className={twMerge(
            clsx("text-[12px] text-red-500 ", classnames?.error)
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
