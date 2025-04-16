import {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
} from "react-hook-form";
import clsx from "clsx";
import { twMerge } from "tw-merge";
interface ClassNamesProps {
  input?: string;
  label?: string;
  error?: string;
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
}: InputProps<T>) => {
  return (
    <div className="flex flex-col relative">
      {label && (
        <label className={twMerge(clsx("text-sm", classnames?.label))}>
          {label}
        </label>
      )}
      <input
        type={type}
        {...register(name, rules)}
        className={twMerge(
          clsx(
            "border rounded-[5px] focus:outline-none px-1 py-0.5 text-sm",
            classnames?.input
          )
        )}
        placeholder={placeholder}
      />
      {error && (
        <p
          className={twMerge(clsx("text-sm text-red-400 ", classnames?.error))}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
