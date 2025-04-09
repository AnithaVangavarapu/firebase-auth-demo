interface InputProps {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const { name, type, value, onChange } = props;
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      className="border rounded-md"
    />
  );
};

export default Input;
