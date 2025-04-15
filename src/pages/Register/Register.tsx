import { Link } from "react-router-dom";
import { PasswordInput, TextInput, Button } from "../../CommonComponents";
import { useRegister } from "./useRegister";

const Register = () => {
  const {
    userName,
    email,
    password,
    confirmPassword,
    errors,
    setUserName,
    setEmail,
    setPassword,
    setconfirmPassword,
    handleRegister,
  } = useRegister();
  return (
    <div className="container mx-auto border w-fit rounded-md border-blue-200 h-[50%] flex items-center flex-col justify-center shadow-md">
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center p-10 gap-2"
      >
        <h2>Register</h2>
        <TextInput
          name="UserName"
          type="text"
          value={userName}
          onChange={setUserName}
          error={errors.userName ? errors.userName : undefined}
        />
        <TextInput
          name="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email ? errors.email : undefined}
        />
        <PasswordInput
          name="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password ? errors.password : undefined}
        />
        <PasswordInput
          name="ConfirmPassword"
          type="password"
          value={confirmPassword}
          onChange={setconfirmPassword}
          error={errors.confirmPassword ? errors.confirmPassword : undefined}
        />
        <Button label="Register" />
        <div>
          <span className="text-sm">Already have account? </span>
          <Link to={"/login"} className="text-blue-400 text-md">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
