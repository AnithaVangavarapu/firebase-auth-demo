import { clsx } from "clsx";
import { twMerge } from "tw-merge";
interface ButtonProps {
  label: string;
  disable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classNames?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  disable,
  onClick,
  classNames,
  type,
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          `rounded-md border px-2 cursor-pointer bg-blue-500 border-blue-200 text-white text-sm`,
          classNames
        )
      )}
      style={{ pointerEvents: disable ? "none" : undefined }}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
