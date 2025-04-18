import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  //Ensure user dont navigate back to login/signup page after logged in
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    if (isUserLoggedIn) navigate("/profile");
  }, []);
  //Authenticate user with email and password
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };

  return { handleLogin, email, password, setEmail, setPassword, error };
};
