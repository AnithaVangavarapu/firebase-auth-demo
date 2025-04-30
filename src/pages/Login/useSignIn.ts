import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase";
import UserContext, { UserContextProps } from "../../context/UserProvider";
export interface SignInProps {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const [authError, setAuthError] = useState<string>();
  const userContextData = useContext<UserContextProps>(UserContext);
  const { setIsAuth, isAuth, loading, setLoading } = userContextData;
  const navigate = useNavigate();

  //Ensure user dont navigate back to login/signup page after logged in
  useEffect(() => {
    // const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    if (isAuth) navigate("/");
  }, [isAuth]);

  //Login authentication
  const handleLogin = async (data: SignInProps) => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem("isUserLoggedIn", "true");

      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setAuthError("Invalid email or password");
      setIsAuth(false);
    }
    setLoading(false);
  };
  return { handleLogin, authError, Link, loading };
};
