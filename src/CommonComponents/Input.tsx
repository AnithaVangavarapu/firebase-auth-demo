import {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from "react-hook-form";
import clsx from "clsx";
import { twMerge } from "tw-merge";

interface ClassNamesProps {
  div?: string;
  label?: string;
  error?: string;
  maindiv?: string;
  input?: string;
}

interface InputProps<T extends FieldValues> {
  label?: string;
  register: UseFormRegister<T>;
  type?: string;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  error?: string;
  classnames?: ClassNamesProps;
  placeholder?: string;
  readonly?: boolean;
  accept?: string;
}

const Input = <T extends FieldValues>({
  label,
  register,
  type = "text",
  name,
  rules,
  error,
  classnames,
  placeholder,
  readonly,
  accept,
}: InputProps<T>) => {
  return (
    <div
      className={twMerge(clsx("flex flex-col relative ", classnames?.maindiv))}
      style={{ width: "100%" }}
    >
      {label && (
        <label className={twMerge(clsx("text-[12px]", classnames?.label))}>
          {label}
        </label>
      )}
      <div
        className={twMerge(
          clsx(
            " border px-1 py-0.5 rounded-[5px] ",
            classnames?.div,
            `${error && "border-red-500"}`,
            `${readonly ? "bg-gray-200" : ""}`
          )
        )}
      >
        <input
          type={type}
          {...register(name, rules)}
          className={twMerge(
            clsx(" focus:outline-none w-full text-[14px]", classnames?.input)
          )}
          placeholder={placeholder}
          readOnly={readonly}
          accept={accept}
        />
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
