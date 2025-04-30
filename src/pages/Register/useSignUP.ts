import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import UserContext, { UserContextProps } from "../../context/UserProvider";
interface SignUpProps {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export const useSignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<SignUpProps>();
  const userContextData = useContext<UserContextProps>(UserContext);
  const { isAuth, setIsAuth } = userContextData;
  const navigate = useNavigate();
  const password = watch("password");
  const [error, setError] = useState<string>("");

  //Ensure user dont navigate back to login/signup page after logged in
  useEffect(() => {
    // const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    if (isAuth) navigate("/");
  }, [isAuth]);

  const handleSignup = async (data: SignUpProps) => {
    try {
      const getDocRef = await getDoc(doc(db, "Users", data.email));

      if (getDocRef.exists()) {
        setError("Email already existed");
        return;
      }
      //Creating new user with email and password
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const currentUser = auth.currentUser;

      //Store new user data in firestore with additional fields (userName and password) based on uid
      if (currentUser) {
        if (currentUser.email !== null) {
          await setDoc(doc(db, "Users", currentUser.email), {
            email: currentUser.email,
            userName: data.userName,
            password: data.password,
            photo: "",
          });
        }
        localStorage.setItem("isUserLoggedIn", "true");
        setIsAuth(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return {
    handleSubmit,
    register,
    handleSignup,
    errors,
    password,
    Link,
    error,
  };
};
