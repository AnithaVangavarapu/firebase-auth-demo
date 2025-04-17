import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase";
export interface SignInProps {
  email: string;
  password: string;
}
export const useSignIn = () => {
  const [authError, setAuthError] = useState<string>();
  const navigate = useNavigate();
  //Ensure user dont navigate back to login/signup page after logged in
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    if (isUserLoggedIn) navigate("/dashboard");
  }, []);
  const handleLogin = async (data: SignInProps) => {
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("user logged successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setAuthError("Invalid email or password");
    }
  };
  return { handleLogin, authError, Link };
};
