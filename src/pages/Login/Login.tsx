import { Link } from "react-router-dom";
import { TextInput, Button, PasswordInput } from "../../CommonComponents";
import { useLogin } from "./useLogin";
import { GoogleSignin } from "../../Components";
const Login = () => {
  const { handleLogin, email, password, setEmail, setPassword, error } =
    useLogin();

  return (
    <div className="container mx-auto border w-fit rounded-md border-blue-200">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center px-10 gap-2"
      >
        <h2>Login</h2>
        {error && <p className="text-red-400 text-md">{error}</p>}
        <TextInput
          name="Email"
          type="email"
          value={email}
          onChange={setEmail}
          require={true}
        />
        <PasswordInput
          name="Password"
          type="password"
          value={password}
          onChange={setPassword}
          require={true}
        />
        <Button label="Login" />
        <p>
          New user?
          <Link to={"/register"} className="text-blue-400">
            Register
          </Link>
        </p>
      </form>
      <GoogleSignin />
    </div>
  );
};

export default Login;
