import { clsx } from "clsx";
import { twMerge } from "tw-merge";
interface ClassNamesProps {
  input?: string;
  label?: string;
  error?: string;
}
interface TextInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  type: string;
  value: string;
  pattern?: string;
  onChange: (val: string) => void;
  error?: string;
  require?: boolean;
  classnames?: ClassNamesProps;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  type,
  value,
  onChange,
  pattern,
  placeholder,
  label,
  error,
  require,
  classnames,
}) => {
  return (
    <div>
      <div>
        {label && (
          <label className={twMerge(clsx(`text-md`, classnames?.label))}>
            {label}
          </label>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={twMerge(
            clsx(
              `border rounded-md border-blue-300 px-2.5 py-2 focus:outline-blue-300`,
              classnames?.input
            )
          )}
          pattern={pattern && pattern}
          placeholder={placeholder ? placeholder : name}
          required={require && require}
        />
      </div>
      {error && (
        <p className={twMerge(clsx("text-red-400 text-md", classnames?.error))}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
