import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FireBase";
import { setDoc, doc } from "firebase/firestore";
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
  const navigate = useNavigate();
  const password = watch("password");
  //Ensure user dont navigate back to login/signup page after logged in
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
    if (isUserLoggedIn) navigate("/profile");
  }, []);
  const handleSignup = async (data: SignUpProps) => {
    console.log(data);
    try {
      //Creating new user with email and password
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const currentUser = auth.currentUser;
      console.log(currentUser);
      //Store new user data in firestore with additional fields (userName and password) based on uid
      if (currentUser) {
        await setDoc(doc(db, "Users", currentUser.uid), {
          email: currentUser.email,
          userName: data.userName,
          password: data.password,
          photo: "",
        });
        navigate("/profile");
      }
      console.log("user registered successfully");
    } catch (error: any) {
      console.log(error);
    }
  };
  return { handleSubmit, register, handleSignup, errors, password, Link };
};
