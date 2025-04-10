import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PasswordInput, TextInput, Button } from "../../CommonComponents";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FireBase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
interface RegisterErrors {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<RegisterErrors>({});

  const validateInputs = (
    userName: string,
    password: string,
    email: string,
    confirmPassword: string
  ) => {
    const pushErrors: RegisterErrors = {};
    if (!userName.trim()) {
      pushErrors.userName = "Enter username";
    } else if (!email.match(`/^[a-z0-9. _%+-]+@(?<=[a-z]){1,}+\.(com)$/ `)) {
      pushErrors.email = "Enter valid email";
    } else if (!password.trim()) {
      pushErrors.password = "Enter password";
    } else if (password.length < 6) {
      pushErrors.password = "Password should contain 6 or more characters";
    } else if (password !== confirmPassword) {
      pushErrors.confirmPassword = "password don't match";
    }
    return pushErrors;
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalErrors = validateInputs(
      userName,
      password,
      email,
      confirmPassword
    );
    setErrors(totalErrors);
    if (Object.keys(totalErrors).length !== 0) return;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      console.log(currentUser);
      if (currentUser) {
        await setDoc(doc(db, "Users", currentUser.uid), {
          email: currentUser.email,
          userName: userName,
          password: password,
        });
        window.location.href = "/profile";
      }

      console.log("user registered successfully");
    } catch (error: any) {
      toast.error(String(error), { position: "top-center" });
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto border w-fit rounded-md border-blue-200">
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center p-10 gap-2"
      >
        <h2>Register?</h2>
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
        <p>
          Already have account?
          <Link to={"/login"} className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
