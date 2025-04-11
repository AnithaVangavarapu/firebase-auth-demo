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
}) => {
  return (
    <div>
      <div>
        {label && <label>{label}</label>}
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded-md border-blue-300 px-2.5 py-2 focus:outline-blue-300"
          pattern={pattern && pattern}
          placeholder={placeholder ? placeholder : name}
          required={require && require}
        />
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
};

export default TextInput;
