interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button className="rounded-md border ">{label}</button>;
};

export default Button;
