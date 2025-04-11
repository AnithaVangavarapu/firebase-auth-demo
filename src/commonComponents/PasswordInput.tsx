import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  type: "password";
  value: string;
  pattern?: string;
  onChange: (val: string) => void;
  error?: string;
  require?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  type,
  value,
  onChange,
  pattern,
  placeholder,
  label,
  error,
  require,
}) => {
  const [inputType, setInputType] = useState<string>(type);

  return (
    <div>
      {label && <label>{label}</label>}
      <div className="border rounded-md border-blue-300 py-2 flex justify-between max-w-fit">
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          pattern={pattern && pattern}
          placeholder={placeholder ? placeholder : name}
          required={require && require}
          className="focus:outline-0 ml-1 "
        />
        {inputType === "password" ? (
          <Eye
            onClick={() => setInputType("text")}
            width={15}
            className="mr-1"
          />
        ) : (
          <EyeOff onClick={() => setInputType("password")} width={15} />
        )}
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default PasswordInput;
