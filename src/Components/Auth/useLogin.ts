import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FireBase";
import { useState } from "react";
export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged successfully");
      window.location.href = "/profile";
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };
  return { handleLogin, email, password, setEmail, setPassword, error };
};
