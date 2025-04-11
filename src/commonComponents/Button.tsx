import { clsx } from "clsx";
import { twMerge } from "tw-merge";
interface ButtonProps {
  label: string;
  disable?: boolean;
  onClick?: () => void;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disable,
  onClick,
  classNames,
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          `rounded-md border px-2 cursor-pointer bg-blue-500 border-blue-200 text-white`,
          classNames
        )
      )}
      style={{ pointerEvents: disable ? "none" : undefined }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
