import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput, Button, PasswordInput } from "../../CommonComponents";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged successfully");
      window.location.href = "/profile";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto border w-fit rounded-md border-blue-200">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center p-10 gap-2"
      >
        <h2>Login</h2>

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
    </div>
  );
};

export default Login;
