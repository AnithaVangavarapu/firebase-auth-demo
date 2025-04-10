interface ButtonProps {
  label: string;
  disable?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, disable, onClick }) => {
  return (
    <button
      className={`rounded-md border px-2 cursor-pointer bg-blue-500 border-blue-200 text-white`}
      style={{ pointerEvents: disable ? "none" : undefined }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
